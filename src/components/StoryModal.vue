<template>
    <!-- The Modal -->
    <div id="story-modal" class="story-modal" style="display: block">
        <!-- STICKY HEADER -->
        <div class="heady">
            <div class="columns">
                <div class="column is-two-thirds" style="padding-left:35px;">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, ab.
                </div>
                <div class="column has-text-right" style="padding-right:35px;">
                    <span style="font-weight:medium;padding-right:3px;">
                        <a href="#" @click.prevent="closeStory()">CLOSE</a>
                    </span>
                    <button class="delete" style="margin-top:2px;" @click="closeStory()"></button>
                </div>
            </div>
        </div>
        <!-- END STICKY -->

        <!-- START LOADER / SERVER ERRORS-->
        <div
            class="card"
            v-if="is_loading || is_error"
            style="text-align:center;height:60px;padding-top:10px;margin-bottom:10px"
        >
            <div v-if="!is_loading && is_error" class="isError" style="margin-top:7px;">{{ errorMessage }}</div>
            <div v-if="is_loading" class="loader" style="margin:auto;"></div>
        </div>
        <!-- ENDS LOADER / SERVER ERRORS-->

        <!-- Modal content -->
        <div v-else class="story-modal-content">
            <div class="content">
                <!-- START STORY -->
                <story :story="story"></story>
                <!-- END STORY -->
                <!-- START COMMENTS -->
                <story-comments :comments="comments"></story-comments>
                <!-- END COMMENTS -->
            </div>
            <div style="margin-top:50px"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axiosBase from "../services/axiosBase";
import Story from "../components/Story";
import StoryComments from "../components/StoryComments";

export default {
    components: {
        Story,
        StoryComments
    },
    data() {
        return {
            is_debug: true,
            is_loading: false,
            // fetch errors
            is_error: false,
            errorMessage: "",
            //
            story: null,
            comments: []
        };
    },
    mounted() {
        console.log("mounted");
        // this.$store.state.storyMounted = true;
        // can pass only one arg to state, so make it an object
        this.setStoryComponentMounted({ storyId: this.storyId, other: "whatever" });
        console.log(`in story-modal mount -> ${this.isStoryComponentMounted}`);
        console.log(`--------- ${this.storyId} ------------`);
    },
    props: {
        picsLayout: {
            default: "layout-tiles",
            type: String
        },
        storyId: { type: String }
        // required: true } // TODO ADD ME LATA
    },
    methods: {
        // ...mapMutations(["setStoryComponentMounted", "resetStoryComponentMounted"]),
        ...mapActions(["setStoryComponentMounted", "resetStoryComponentMounted"]),
        // showStory() {
        //   this.$store.commit("showStory");
        // }
        closeStory() {
            console.log("Closing story");
            this.resetStoryComponentMounted();
            // destroy the vue listeners, etc
            this.$destroy();
            // remove the element from the DOM
            this.$el.parentNode.removeChild(this.$el);
            // window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
        },
        async fetchData() {
            // try {
            //     this.is_loading = true;
            //     // await new Promise(resolve => setTimeout(resolve, 2000));
            //     const response = await axiosBase.get(`/users/${this.username}/stories`);
            //     console.log(response.data);
            //     const { stories, count, fullCount, user_info } = response.data;
            //     for (let story of stories) {
            //         story.num_comments = Math.floor(Math.random() * 10);
            //     }
            //     this.stories = stories;
            //     this.count = count;
            //     this.fullCount = fullCount;
            //     this.user_info = user_info;
            //     this.is_loading = false;
            // } catch (e) {
            //     this.is_loading = false;
            //     this.is_error = true;
            //     if (e.response) {
            //         if (e.response.status === 404) {
            //             this.errorMessage = "USER NOT FOUND";
            //         } else {
            //             // Most probably a 500
            //             this.errorMessage = "SERVER ERROR";
            //         }
            //     }
            // }
        }
    },
    computed: {
        // isStoryMounted() {
        //   return this.$store.getters.isStoryMounted;
        // }
    },
    created() {
        this.fetchData();
    }
};
</script>

<style>
/***** SCROLL BAR WEBKIT & GECKO *****/
.story-modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 100;
    /* Sit on top */
    left: 0;
    top: 56px;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.8);
    /* Black w/ opacity */
    padding: 0 5rem 0 5rem;
}

/* Modal Content/Box */
.story-modal-content {
    background-color: #eff0eb;
    /* 15% from the top and centered */
    padding: 20px;
    /* border: 1px solid #222; */
    width: 100%;
}

/* Modal / hide scrollbar chrome applekit */
body.no-scrollbar-webkit::-webkit-scrollbar {
    display: none;
}

/* Modal / hide scrollbar firefox */
html.frf-hide-sb {
    scrollbar-width: none;
}

/*** sticky header ***/
.heady {
    position: -webkit-sticky;
    /* Safari */
    position: sticky;
    top: 0px;
    left: 0px;
    background: rgb(38, 96, 161);
    z-index: 1000;
    height: 45px;
    color: white;
}

.heady a,
.heady a:hover {
    color: white;
}

/*** content takes all width if <= 1024 ***/
@media only screen and (max-width: 1024px) {
    .story-modal {
        padding: 0;
    }
}

/************** spinner **************/
.loader {
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/*** spacing ***/
.mt10p20 {
    margin-top: 10px;
    padding-bottom: 20px;
}
</style>
