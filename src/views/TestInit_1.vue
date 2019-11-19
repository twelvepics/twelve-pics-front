<template>
    <div class="test">
        <p>Test init</p>
        <p>isAuthenticated: {{ isAuthenticated }}</p>
        <p>user: {{ authenticatedUser.username }}</p>
        <p>atInitUserLoaded: {{ atInitUserLoaded }}</p>
        <p v-if="atInitUserLoaded">I am refreshed</p>
        <p><input type="text" v-model="test" />{{ test }}</p>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            test: "",
            inited: false
        };
    },
    methods: {
        getData() {
            if (this.atInitUserLoaded) {
                if (!this.inited) {
                    this.inited = true;
                }
                console.log("getData call");
            }
        }
    },
    computed: {
        ...mapGetters(["isAuthenticated", "authenticatedUser", "atInitUserLoaded"])
    },
    created() {
        console.log("CREATED");
        this.getData();
    },
    mounted() {
        console.log("MOUNTED");
    },
    updated() {
        console.log("UPDATED");
        if (!this.inited) {
            console.log("UPDATED CALLED REFRESH");
            this.getData();
        }
    }
};
</script>
<style scoped>
.test {
    margin-top: 100px;
    padding-left: 50px;
}
input {
    margin-right: 15px;
}
</style>
