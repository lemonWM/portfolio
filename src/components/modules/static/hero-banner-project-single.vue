<template>
    <section v-if="state.loaded" class="hero-banner-single">
        <div class="container-sm">
            <div class="hero-banner-single__wrapper">
                <div ref="title" class="hero-banner-single__wrapper--top">
                    <h2>{{ state.project.title }}</h2>
                    <h1>{{ state.project.details.name }}</h1>
                </div>
                <div ref="desc" class="hero-banner-single__wrapper--bottom d-flex flex-row">
                    <div class="details d-flex flex-column">
                        <span>Client: {{ state.project.details.client }}</span>
                        <span>Date: {{ state.project.details.date }}</span>
                        <a :href="state.project.details.repoLink" target="_blank">Code</a>
                    </div>
                    <div class="deccription">
                        <p>{{ state.project.details.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { onMounted, reactive, computed, ref, onUpdated } from 'vue'
    import { useStore } from 'vuex'
    import { useRoute } from 'vue-router'
    import gsap from 'gsap'
    import ScrollTrigger from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);

    export default {
        name: 'hero-banner-project-single',

        setup() {

            const store = useStore();
            const route = useRoute();

            const state = reactive({
                loaded: false,
                project: {}
            })

            const title = ref(null);
            const desc = ref(null);

            const projectSingle = route.params.id
            const loaded = computed(() => store.state.theme.loaded );
            const project =  store.getters.singleProject(projectSingle);

            const gsapAnimation = () => {

                gsap.to(title.value, {
                    scrollTrigger: {
                        trigger: title.value,
                        scrub: true,
                        start: "top top",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 10,
                    opacity: 0,
                    autoAlpha: 0
                });

                gsap.to(desc.value, {
                    scrollTrigger: {
                        trigger: desc.value,
                        scrub: true,
                        start: "top top",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 10,
                    opacity: 0,
                    autoAlpha: 0,
                    margin: '140 0 0 0'
                });
            }

            onMounted(() => {
                state.project = project
                state.loaded = loaded;
            })

            onUpdated(() => {

                gsapAnimation();
            })

            return {
                state,loaded, projectSingle, project, title, desc
            }
        }
    } 
</script>

<style lang="scss" scoped>

    .hero-banner-single {
        min-height: calc(100vh - 150px);

        &__wrapper {
            @keyframes top_h1 {
                from {opacity: 0; transform: skewY(4deg) translatey(10%);}
                to {opacity: 1; transform: skewY(0);}
            }
            @keyframes top_h2 {
                from {opacity: 0;}
                to {opacity: 1;}
            }

            &--top {

                h2 {
                    padding-top: 100px;
                    font-size: 20px;
                    opacity: 1;
                    animation-name: top_h2;
                    animation-duration: 3s;
                }
                h1 {

                    padding-top: 30px;
                    max-width: 600px;
                    font-size: 70px;
                    opacity: 1;
                    animation-name: top_h1;
                    animation-duration: 1s;
                }
            }
            &--bottom {
                justify-content: space-between;
                padding-top: 100px;
                margin-top: 0px;
                opacity: 1;

                .details {

                    span {
                        line-height: 36px;
                        padding-bottom: 20px;
                    }
                }
                .deccription {
                    max-width: 400px;

                    p {
                        line-height: 50px;
                    }
                }
            }
        }
    }
</style>