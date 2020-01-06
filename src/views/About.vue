<template>
    <main>
        <div class="columns is-centered">
            <!-- CENTER COLUMNN -->
            <div class="column is-three-quarters-desktop">
                <!-- START PROFILE -->
                <div class="card">
                    <!-- CARD CONTENT -->
                    <div class="card-content">
                        <p class="title is-size-4">About 12 pics</p>
                        <p class="subtitle is-size-6">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis praesentium
                            esse veritatis nemo!
                        </p>
                        <!-- ABOUT ONE -->
                        <div class="field m-30-0-15-0">
                            <h5 class="has-text-weight-semibold is-2">
                                Reiciendis magnam excepturi quae consequuntur sint quidem.
                            </h5>
                            <p class="is-size-6">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident id corrupti vel
                                aliquid omnis, accusantium iste nam nisi praesentium ab repellendus aliquam optio ad.
                                Recusandae dolore distinctio explicabo ratione similique voluptate aspernatur excepturi,
                                perspiciatis quia, ipsam iste, cupiditate repellendus officia nisi architecto maxime
                                ullam quisquam sunt accusamus atque sit. Sed eaque placeat expedita fugit at a quibusdam
                                aliquid iure! Odit, libero magni. Quae magni sit totam dolorum fuga! Hic, ullam. Vitae
                                quidem veniam adipisci aliquam est iusto eligendi, dignissimos non ipsam maxime hic
                                repudiandae corrupti fuga, consequatur natus magnam, rem officiis. Harum, ducimus vel.
                                Architecto perferendis porro officiis excepturi reprehenderit!
                            </p>
                        </div>
                        <!-- ABOUT ONE -->

                        <!-- ABOUT TWO -->
                        <div class="field m-30-0-15-0">
                            <h5 class="has-text-weight-semibold is-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </h5>
                            <p class="is-size-6">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deserunt eum sapiente,
                                deleniti pariatur illo. Animi maxime tenetur, laudantium maiores harum expedita?
                                Aspernatur optio aperiam dicta provident minima alias est rem cupiditate impedit
                                repellendus tempora possimus, veritatis esse repudiandae explicabo tenetur qui
                                perferendis. Repudiandae qui cum error quas quia nostrum.
                            </p>
                        </div>
                        <!-- ABOUT TWO -->

                        <!-- ABOUT THREE -->
                        <div class="field m-30-0-15-0">
                            <h5 class="has-text-weight-semibold is-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </h5>
                            <p class="is-size-6">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deserunt eum sapiente,
                                deleniti pariatur illo. Animi maxime tenetur, laudantium maiores harum expedita?
                                Aspernatur optio aperiam dicta provident minima alias est rem cupiditate impedit
                                repellendus tempora possimus, veritatis esse repudiandae explicabo tenetur qui
                                perferendis. Repudiandae qui cum error quas quia nostrum.
                            </p>
                        </div>
                        <!-- ABOUT THREE -->

                        <!-- LOCATION -->
                        <div class="field m-30-0-15-0">
                            <h5 class="has-text-weight-semibold is-2">
                                My location:
                                <span class="is-size-6 has-text-weight-normal">Paris, France</span>
                            </h5>
                        </div>
                        <!-- LOCATION -->
                        <div style="margin-top:20px;"></div>
                    </div>
                </div>
                <!-- END PROFILE -->
            </div>
        </div>
    </main>
</template>
<script>
export default {
    // components: {}
};
</script>
<style>
/************** layout ***********/
html,
body {
    width: 100%;
    height: 100%;
}

#app {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

main {
    flex-grow: 1;
}

navbar,
main,
footer {
    flex-shrink: 0;
}

main {
    margin-top: 90px;
}

footer {
    margin-top: 30px;
}

/************** spacing ***********/
.content h5 {
    margin-bottom: 0.5rem;
}
</style>
