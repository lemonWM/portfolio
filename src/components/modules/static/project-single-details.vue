<template>
    <section v-if="state.loaded" class="project-single-details d-flex flex-column">
        <div class="container-sm">
            <div class="trigger">
                <div ref="trigger" class="project-single-details__wrapper d-flex flex-row">
                    <div v-for="(item, index) in state.project.details.images " 
                        :ref="el =>  itemList.push(el)" 
                        :key="index" class="project-single-details__wrapper--img" 
                        :class="[`project-single-details__wrapper--img--${index + 1}`]">
                        <img v-if="index < '3'" :src="item.url" alt="img">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section  v-if="state.loaded" class="project-single-features">
        <div class="container-sm">
            <div class="project-single-details__wrapper-texts">
                <div class="project-single-details__wrapper--features">
                    <h3>About project</h3>
                    <p>{{ project.details.features }}</p>
                </div>
            </div>
        </div> 
    </section>
</template>

<script>
    import { onMounted, reactive, computed, ref, onUpdated, onUnmounted } from 'vue'
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

            const itemList = ref([]);
            const trigger = ref(null);
            

            const gsapAnimation2 = () => {

                let sections = gsap.utils.toArray(itemList.value);

                if(sections.length){

                    gsap.to(sections, {
                        xPercent: -100 * (sections.length - 1),
                        ease: 'none',
                        start: "top top",
                        scrollTrigger: {
                            trigger: trigger.value,
                            pin: true,
                            scrub: true,
                            snap: 1 / (sections.length - 1),
                            end: "+=3500",
                        },
                    });
                }
            }

            onMounted(() => {
                state.project = project
                state.loaded = loaded;
            });

            onUpdated(() => {

                setTimeout(() => {
                    
                    gsapAnimation2();
                }, 500);
            });

            onUnmounted(() => {

                let triggers = ScrollTrigger.getAll();

                triggers.forEach( trigger => {			
                    trigger.kill();
                });
            })

            return {
                state,loaded, projectSingle, project, itemList, trigger
            }
        }
    } 
</script>

<style lang="scss" scoped>

    .project-single-details {
  
        &__wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: nowrap;
            z-index: 3;

            &--img {
                padding-top: 100px;

                img {
                    @media (max-width: 768px) {
                        max-width: 600px;
                    }
                }
            }
        }
    }
    .project-single-features {
        margin-top: 150px;
    }

</style>