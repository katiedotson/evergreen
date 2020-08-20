import { Post, User, UserData } from "../types";

interface Data {
  posts: Post[];
  users: User[];
}

const data: Data = {
  posts: [
    {
      title: "All About Magnets and Magenetism",
      body:
        "<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p><p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p><p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>",
      relevance: 0,
      tagline: "Magnets are really sexy and you don't know it yet",
      img:
        "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
      urlName: "all-about-magnets",
      authorId: 1
    },
    {
      title: "An Idiot's Guide to Electricity",
      body:
        "<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>",
      relevance: 0,
      tagline: "What you're about to read is 'electric'",
      img:
        "https://images.unsplash.com/photo-1570544389273-27246c0ba489?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2166&q=80",
      urlName: "an-idiots-guide-to-electricity",
      authorId: 0
    },
    {
      title: "A Brief Introduction to Music Theory",
      body:
        "<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>",
      relevance: 0,
      tagline: "Music is the real food of life",
      img:
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
      urlName: "a-brief-introduction-to-music-theory",
      authorId: 0
    },
    {
      title: "Love is Love",
      body:
        "<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>",
      relevance: 0,
      tagline: "Supporting your LGBT+ friends and acquaintances",
      img:
        "https://images.unsplash.com/photo-1501604297285-ce3a097f7255?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
      urlName: "love-is-love",
      authorId: 0
    },
    {
      title: "6 Bicycles",
      body:
        "<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>",
      relevance: 0,
      tagline: "How cycling changed my perspective",
      img:
        "https://images.unsplash.com/photo-1595810033299-5a6fcda2aa71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
      urlName: "6-bicycles",
      authorId: 0
    },
    {
      title: "All About Magnets and Magenetism",
      body:
        "<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p><p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p><p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>",
      relevance: 0,
      tagline: "Magnets are really sexy and you don't know it yet",
      img:
        "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
      urlName: "all-about-magnets-2",
      authorId: 1
    },
    {
      title: "An Idiot's Guide to Electricity",
      body:
        "<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>",
      relevance: 0,
      tagline: "What you're about to read is 'electric'",
      img:
        "https://images.unsplash.com/photo-1570544389273-27246c0ba489?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2166&q=80",
      urlName: "an-idiots-guide-to-electricity-2",
      authorId: 0
    },
    {
      title: "A Brief Introduction to Music Theory",
      body:
        "<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>",
      relevance: 0,
      tagline: "Music is the real food of life",
      img:
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
      urlName: "a-brief-introduction-to-music-theory-2",
      authorId: 0
    },
    {
      title: "Love is Love",
      body:
        "<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>",
      relevance: 0,
      tagline: "Supporting your LGBT+ friends and acquaintances",
      img:
        "https://images.unsplash.com/photo-1501604297285-ce3a097f7255?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
      urlName: "love-is-love-2",
      authorId: 0
    },
    {
      title: "6 Bicycles",
      body:
        "<p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p><p>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>",
      relevance: 0,
      tagline: "How cycling changed my perspective",
      img:
        "https://images.unsplash.com/photo-1595810033299-5a6fcda2aa71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
      urlName: "6-bicycles-2",
      authorId: 0
    }
  ],
  users: [
    {
      userId: "",
      firstName: "Edith",
      lastName: "Wilson",
      interests: ["music", "cycling", "human rights", "physics"],
      authorId: 0,
      joinDate: new Date(),
      email: "test@test.co",
      location: "The Green Grass on the Other Side",
      occupation: "Maker of Things",
      bio: "I am from somehwere far, far away",
      img:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
    }
  ]
};

export default {
  userDataKey: "userData",
  userKey: "user",
  saveAvatarImageLocal(file: File): void {
    this.saveFileLocally("avatar", file);
  },
  saveFileLocally(key: string, file: File): void {
    const reader = new FileReader();
    reader.onload = function() {
      const thisImage = reader.result;
      if (typeof thisImage == "string") {
        localStorage.setItem(key, thisImage);
      }
    };
    reader.readAsDataURL(file);
  },
  storeUserData(userData: UserData) {
    sessionStorage.setItem(this.userDataKey, JSON.stringify(userData));
  },
  removeUserData() {
    sessionStorage.removeItem(this.userDataKey);
    sessionStorage.removeItem(this.userKey);
  },
  getUserPosts(): Post[] {
    const authorId = this.getUser()?.authorId;
    return data.posts.filter(post => post.authorId == authorId);
  },
  getPost(urlName: string): Post {
    const post = data.posts.find(post => post.urlName == urlName);
    if (!post) {
      throw new Error(`Post could not be found with given urlName: ${urlName}`);
    }
    return post;
  },
  getUserData(): UserData | null {
    return this.getSessionItem(this.userDataKey);
  },
  getUser(): User {
    return this.getSessionItem(this.userKey);
  },
  getAuthor(authorId: number) {
    return data.users.find(user => user.authorId == authorId);
  },
  getSessionItem(key: string): any {
    const item = sessionStorage.getItem(key);
    if (item != null && item != "") {
      return JSON.parse(item);
    }
    return null;
  },
  getPosts(): Post[] {
    return data.posts;
  },
  loadUserData(): Promise<boolean> {
    return new Promise(resolve => {
      //eventually this will be a call to the server to get user data for this userId
      //for now just add the user ^ to the session storage
      sessionStorage.setItem(this.userKey, JSON.stringify(data.users[0]));
      window.location.reload();
      resolve(true);
    });
  }
};
