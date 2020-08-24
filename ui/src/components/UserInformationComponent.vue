<template>
  <div>
    <AccountHeading :name="getName()" />
    <Loader :show="isLoading" />
    <ErrorCard :show="showError" :message="errorMessage" />
    <p v-if="firstTime">Please provide some information for the best experience.</p>
    <div class="form" v-if="!isLoading">
      <div class="field-wrapper" :class="{ 'form-group--error': $v.user.email.$error }">
        <label for="email">Email</label>
        <input id="email" v-model.trim="$v.user.email.$model" />
        <div class="error" v-if="!$v.user.email.required">
          Field is required
        </div>
        <div class="error" v-if="!$v.user.email.email">
          Please enter a valid email address
        </div>
      </div>
      <div class="field-wrapper" :class="{ 'form-group--error': $v.user.firstName.$error }">
        <label for="firstName">First Name</label>
        <input id="firstName" v-model.trim="$v.user.firstName.$model" />
        <div class="error" v-if="!$v.user.firstName.required">
          Field is required
        </div>
        <div class="error" v-if="!$v.user.firstName.minLength">
          Minimum length: {{ $v.user.firstName.$params.minLength.min }} characters
        </div>
      </div>
      <div class="field-wrapper" :class="{ 'form-group--error': $v.user.lastName.$error }">
        <label for="lastName">Last Name</label>
        <input id="lastName" v-model.trim="$v.user.lastName.$model" />
        <div class="error" v-if="!$v.user.lastName.required">
          Field is required
        </div>
        <div class="error" v-if="!$v.user.lastName.minLength">
          Minimum length: {{ $v.user.lastName.$params.minLength.min }} characters
        </div>
      </div>
      <div class="field-wrapper">
        <label for="location">Location</label>
        <input id="location" v-model="user.location" />
      </div>
      <div class="field-wrapper">
        <label for="occupation">Occupation</label>
        <input id="occupation" v-model="user.occupation" />
      </div>
      <div class="field-wrapper">
        <label for="bio">Bio</label>
        <textarea id="bio" v-model="user.bio" />
      </div>
      <div class="field-wrapper">
        <label for="img">Avatar</label>
        <input type="file" id="img" @change="processFile($event)" />
      </div>
      <div class="button" @click="openUserCard" v-if="!this.firstTime">View User Card</div>
      <button class="submit" type="submit" @click="submit" :disabled="this.$v.$invalid">
        {{ getSubmitBtnText }}
      </button>
    </div>
    <UserCardModal :user="this.user" v-on:close-modal="showUserCard = false" :show="showUserCard" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccountHeading from "./AccountHeading.vue";
import Loader from "./Loader.vue";
import UserCardModal from "./AuthorCardModal.vue";
import ErrorCard from "./ErrorCard.vue";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, email } from "vuelidate/lib/validators";
import { HTMLInputEvent } from "@/types";
import { User } from "../types";
import session from "../session";

export default Vue.extend({
  props: {
    firstTime: {
      type: Boolean
    }
  },
  components: {
    AccountHeading,
    UserCardModal,
    Loader,
    ErrorCard
  },
  data() {
    return {
      showUserCard: false,
      user: {} as User,
      isLoading: true,
      showError: false,
      errorMessage: "",
      submitBtnText: "Submit"
    };
  },
  mounted() {
    this.loadUser();
  },
  mixins: [validationMixin],
  validations: {
    user: {
      email: {
        required,
        email
      },
      firstName: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30)
      },
      lastName: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30)
      }
    }
  },
  methods: {
    getName(): string {
      if (this.firstTime) {
        return "Welcome to Evergreen";
      }
      return "Information";
    },
    openUserCard() {
      this.showUserCard = true;
    },
    loadUser() {
      if (!this.firstTime) {
        this.user = session.getUser();
        this.isLoading = false;
      } else {
        this.user = {
          firstName: "",
          lastName: "",
          email: "",
          bio: "",
          img: "",
          location: "",
          occupation: ""
        } as User;
        this.isLoading = false;
      }
    },
    processFile(event: HTMLInputEvent) {
      if (event && event.target && event.target.files) {
        const file = event.target.files[0];
        session.saveAvatarImageLocal(file);
      }
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid && !this.firstTime) {
        session
          .updateUser(this.user)
          .then(success => {
            session.storeUser(this.user);
          })
          .catch(() => {
            this.errorMessage = "Something went wrong.";
            this.showError = true;
          });
      } else if (!this.$v.$invalid) {
        session
          .createNewUser(this.user)
          .then(success => {
            session.storeUser(this.user);
          })
          .catch(() => {
            this.errorMessage = "Something went wrong.";
            this.showError = true;
          });
      }
    }
  },
  computed: {
    getSubmitBtnText: function(): string {
      if (this.$v.$invalid) {
        return "Invalid";
      } else {
        if (this.firstTime) {
          return "Continue";
        } else {
          return "Update";
        }
      }
    }
  }
});
</script>

<style lang="scss">
div.form {
  margin-top: 36px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;

  div.field-wrapper {
    margin-bottom: 16px;
    height: 70px;

    &.form-group--error {
      input,
      textarea {
        color: $bright-orange;
        border: 1px solid $bright-orange;
      }
    }

    div.error {
      display: block;
      font-family: "Open Sans", sans-serif;
      font-size: x-small;
      color: $bright-orange;
      margin-left: 4px;
      @include xl {
        margin-left: 240px;
      }
      @include lg {
        margin-left: 240px;
      }
      @include md {
        margin-left: 240px;
      }
    }

    input,
    textarea {
      border: 1px solid $dirty-snow;
      background-color: $smoke;
      display: block;
      padding: 8px;
      width: 92%;
      margin-left: auto;
      margin-right: auto;
      font-family: "Merriweather", serif;
      @include xl {
        width: 300px;
      }
      @include lg {
        width: 300px;
      }
      @include md {
        width: 300px;
      }
    }

    label {
      float: left;
      height: 30px;
      line-height: 30px;
      width: 240px;
      font-weight: bold;
    }
  }
  button {
    display: block;
    width: 100%;
    margin-bottom: 8px;
    &:disabled {
      background-color: $firetruck;
    }
  }
}
</style>
