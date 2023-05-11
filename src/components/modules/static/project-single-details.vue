<template>
    <section v-if="state.loaded" class="project-single-details d-flex flex-column">
        <div class="container-sm">
            <div class="project-single-details__wrapper d-flex flex-row">
                <div v-for="(item, index) in state.project.details.images " :key="index" class="project-single-details__wrapper--img" :class="[`project-single-details__wrapper--img--${index + 1}`]">
                    <img v-if="index < '3'" :src="item.url" alt="img">
                </div>
            </div>
        </div>
        <div class="container">
            <div class="project-single-details__wrapper">
                <div class="project-single-details__wrapper--features">
                    <h3>About project</h3>
                    <p>{{ project.details.features }}</p>
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
        name: 'project-single-details',

        setup() {

            const store = useStore();
            const route = useRoute();

            const state = reactive({
                loaded: false,
                project: {}
            });

            const projectSingle = route.params.id;
            const loaded = computed(() => store.state.theme.loaded );
            const project =  store.getters.singleProject(projectSingle);

            onMounted(() => {
                state.project = project
                state.loaded = loaded;
            })

            return {
                state,loaded, projectSingle, project
            }
        }
    } 
</script>

<style lang="scss" scoped>

    .project-single-details {
        min-height: 500px;

        &__wrapper {


            &--img {
                
                img {
                    position: relative;
                    z-index: 3;
                }

                &--1 {


                    img {
                        max-width: 200px;
                        margin-right: -50px;
                        z-index: 4;
                        margin-top: 200px;
                    }
                }
                &--2 {


                    img {
                        max-width: 700px;
                    }
                }
                &--3 {


                    img {
                        max-width: 200px;
                        margin-left: 20px;
                        margin-top: 30px;
                    }
                }
            }

            &--features {

                h3 {
                    margin-top: 200px;
                    margin-bottom: 30px;
                    font-size: 13px;
                    letter-spacing: 2px;
                }
                p {
                    font-size: 21px;
                    margin-bottom: 200px;
                    //max-width: 500px;
                }
            }
        }
    }

</style>