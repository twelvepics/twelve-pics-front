<template>
    <!-- PIC LANDSCAPE BOX -->
    <div v-if="is_thumb_horizontal" class="box story-item-pic-landscape">
        <p class="title is-5" style="margin-bottom:.6em;">
            <router-link
                v-bind:to="{
                    name: 'view-story',
                    params: { slug: story.slug }
                }"
                >{{ story.title }}</router-link
            >
        </p>
        <p class="pic">
            <router-link
                v-bind:to="{
                    name: 'view-story',
                    params: { slug: story.slug }
                }"
            >
                <img
                    :src="story_thumb.web_path"
                    :alt="story_thumb.description"
                    :width="story_thumb.width"
                    :height="story_thumb.height"
                />
            </router-link>
        </p>
        <p class="pitch">{{ story.pitch }}</p>
        <div class="is-divider story-divider"></div>
        <p class="bottom-line">
            <span
                class="icon is-left star"
                :class="{ upvoted, 'tooltip is-tooltip-warning is-tooltip-right': !isAuthenticated }"
                data-tooltip="Please authenticate to star a story"
                @click="starMe"
            >
                <font-awesome-icon icon="star"></font-awesome-icon>
            </span>
            <span class="cat">[{{ category_display }}]</span>
            - Posted by:
            <a @click.prevent="gotoUserProfile">{{ story.author_info.display_name || story.author_info.username }}</a>
            - {{ elapsed() }} -
            {{ story.comments_count || "No" }}
            {{ story.comments_count === 0 || story.comments_count > 1 ? "comments" : "comment" }}
        </p>
    </div>

    <!-- END PIC LANDSCAPE BOX-->

    <!-- PIC PORTRAIT BOX-->
    <div v-else class="box story-item-pic-portrait">
        <div class="title-pitch">
            <p class="title is-5" style="margin-bottom:.3em;">
                <router-link
                    v-bind:to="{
                        name: 'view-story',
                        params: { slug: story.slug }
                    }"
                    >{{ story.title }}</router-link
                >
            </p>
            <p class="pitch">{{ story.pitch }}</p>
        </div>
        <p class="pic" style="padding-top:.3rem;">
            <router-link
                v-bind:to="{
                    name: 'view-story',
                    params: { slug: story.slug }
                }"
            >
                <img
                    :src="story_thumb.web_path"
                    :alt="story_thumb.description"
                    :width="story_thumb.width"
                    :height="story_thumb.height"
                />
            </router-link>
        </p>
        <div class="is-divider story-divider"></div>
        <p class="bottom-line">
            <span
                class="icon is-left star"
                :class="{ upvoted, 'tooltip is-tooltip-warning is-tooltip-right': !isAuthenticated }"
                data-tooltip="Please authenticate to star a story"
                @click="starMe"
            >
                <font-awesome-icon icon="star"></font-awesome-icon>
            </span>
            <span class="cat">[{{ category_display }}]</span>
            - Posted by:
            <a @click.prevent="gotoUserProfile">{{ story.author_info.display_name || story.author_info.username }}</a>
            - {{ elapsed() }} -
            {{ story.comments_count || "No" }}
            {{ story.comments_count === 0 || story.comments_count > 1 ? "comments" : "comment" }}
        </p>
    </div>
    <!-- END PIC PORTRAIT BOX-->
</template>

<script>
import { categoriesDisplay } from "../utils/categories";
import { timeSince } from "../utils/dateutils";
import axiosBase from "../services/axiosBase";
import { mapGetters } from "vuex";
import * as Sentry from "@sentry/browser";

export default {
    props: ["story"],
    data() {
        return {
            categoriesDisplay,
            upvoted: this.story.upvoted
        };
    },
    methods: {
        async starMe() {
            console.log("starMe");
            try {
                if (this.isAuthenticated) {
                    if (!this.upvoted) {
                        await axiosBase.post(`/stories/${this.story._key}/upvote`);
                        this.upvoted = true;
                    } else {
                        // :story_key/upvotes/:upvote_key
                        await axiosBase.delete(`/stories/${this.story._key}/upvote/${this.authenticatedUser._key}`);
                        this.upvoted = false;
                    }
                }
            } catch (e) {
                if (e.response) {
                    if (e.response.status) {
                        console.log(e.response);
                    }
                } else {
                    console.log(e);
                    Sentry.captureException(e);
                }
            }
        },
        elapsed() {
            return timeSince(this.story.date_created);
        },
        gotoUserProfile() {
            // console.log("gotoUserProfile");
            this.$router.push({
                name: "user",
                params: { username: this.story.author_info.username }
            });
        }
    },
    computed: {
        ...mapGetters(["isAuthenticated", "authenticatedUser"]),

        story_thumb() {
            return this.story.pics[0].small;
        },
        is_thumb_horizontal() {
            return this.story_thumb.width >= this.story_thumb.height;
        },
        is_thumb_vertical() {
            return !this.is_thumb_horizontal();
        },
        category_display() {
            return this.categoriesDisplay[this.story.category];
        }
    },
    created() {
        // console.log("*************************");
        // // console.log(this.story);
        // console.log(this.categoriesDisplay);
        // console.log("*************************");
    }
};
</script>

<style scoped>
/**************** STORIES BOXES STYLES *****************/
.story-item-pic-landscape {
    display: grid;
    grid-template-columns: 200px 15px 1fr;
}

.story-item-pic-landscape .title {
    grid-column: 1 / -1;
}

.story-item-pic-landscape .pitch {
    grid-column: 3 / -1;
}

.story-item-pic-portrait {
    display: grid;
    grid-template-columns: 130px 15px 1fr;
    grid-auto-rows: min-content;
}

.story-item-pic-portrait .pic {
    grid-column: 1 / 2;
    grid-row: 1 / span 2;
}

.story-item-pic-portrait .title-pitch {
    grid-column: 3 / -1;
    grid-row: 1 / span 2;
}

.bottom-line {
    grid-column: 1 / -1;
}

.story-divider {
    grid-column: 1 / -1;
    margin-bottom: 0.3rem;
    border-top: 0.1px solid #dbdbdb;
}

/**** types ******/
.title {
    line-height: 1.2em;
}
.cat {
    color: #aaa;
}
.star {
    display: inline-block;
    color: #aaa;
    padding: 0 0.3rem 0 0;
    height: 0rem;
    width: none;
    cursor: pointer;
}

.upvoted {
    color: orange;
}

.pitch {
    --lh: 1.4rem;
    line-height: var(--lh);
    --max-lines: 6;
    max-height: calc(var(--lh) * var(--max-lines));
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
