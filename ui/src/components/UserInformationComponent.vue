<template>
  <div>
    <AccountHeading name="Information" />
    <Loader :show="isLoading" />
    <div class="form" v-if="!isLoading">
      <div class="field-wrapper" :class="{ 'form-group--error': $v.author.email.$error }">
        <label for="email">Email</label>
        <input id="email" v-model.trim="$v.author.email.$model" />
        <div class="error" v-if="!$v.author.email.required">
          Field is required
        </div>
        <div class="error" v-if="!$v.author.email.email">
          Please enter a valid email address
        </div>
      </div>
      <div class="field-wrapper" :class="{ 'form-group--error': $v.author.firstName.$error }">
        <label for="firstName">First Name</label>
        <input id="firstName" v-model.trim="$v.author.firstName.$model" />
        <div class="error" v-if="!$v.author.firstName.required">
          Field is required
        </div>
        <div class="error" v-if="!$v.author.firstName.minLength">
          Minimum length: {{ $v.author.firstName.$params.minLength.min }} characters
        </div>
      </div>
      <div class="field-wrapper" :class="{ 'form-group--error': $v.author.lastName.$error }">
        <label for="lastName">Last Name</label>
        <input id="lastName" v-model.trim="$v.author.lastName.$model" />
        <div class="error" v-if="!$v.author.lastName.required">
          Field is required
        </div>
        <div class="error" v-if="!$v.author.lastName.minLength">
          Minimum length: {{ $v.author.lastName.$params.minLength.min }} characters
        </div>
      </div>
      <div class="field-wrapper">
        <label for="location">Location</label>
        <input id="location" v-model="author.location" />
      </div>
      <div class="field-wrapper">
        <label for="occupation">Occupation</label>
        <input id="occupation" v-model="author.occupation" />
      </div>
      <div class="field-wrapper">
        <label for="bio">Bio</label>
        <textarea id="bio" v-model="author.bio" />
      </div>
      <div class="field-wrapper">
        <label for="img">Avatar</label>
        <input type="file" id="img" @change="processFile($event)" />
      </div>
      <div class="button" @click="openAuthorCard">View Author Card</div>
      <button class="submit" type="submit" @click="submit">Submit</button>
    </div>
    <AuthorCardModal
      :author="this.author"
      v-on:close-modal="showAuthorCard = false"
      :show="showAuthorCard"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccountHeading from "./AccountHeading.vue";
import Loader from "./Loader.vue";
import AuthorCardModal from "./AuthorCardModal.vue";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, email } from "vuelidate/lib/validators";
import { HTMLInputEvent } from "@/types";
import session from "../session";

export default Vue.extend({
  components: {
    AccountHeading,
    AuthorCardModal,
    Loader
  },
  data() {
    return {
      showAuthorCard: false,
      author: {},
      isLoading: true
    };
  },
  mounted() {
    this.loadAuthor();
  },
  mixins: [validationMixin],
  validations: {
    author: {
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
    openAuthorCard() {
      this.showAuthorCard = true;
    },
    loadAuthor() {
      this.author = session.getUser();
      this.isLoading = false;
    },
    processFile(event: HTMLInputEvent) {
      if (event && event.target && event.target.files) {
        const file = event.target.files[0];
        session.saveAvatarImageLocal(file);
      }
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("submit!");
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
  }
}
</style>
