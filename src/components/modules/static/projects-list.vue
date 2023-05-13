<template>
    <section class="projects-list">
        <div v-if="loaded" class="projects-list__wrapper">

            <div class="projects-list__wrapper--stripes" :class="layout">
                <span class="projects-list__wrapper--stripes stripe overlay-1"></span>
                <span class="projects-list__wrapper--stripes stripe overlay-2"></span>
                <span class="projects-list__wrapper--stripes stripe overlay-3"></span>
                <span class="projects-list__wrapper--stripes stripe overlay-4"></span>
            </div>
     
            <div class="container">
                <div class="projects-list__wrapper--title">                    
                    <div ref="animation" class="texts">
                        <h2>ready to use</h2>
                        <h1 ref="title">Projects examples </h1>
                    </div>
                </div>

                <div class="projects-list__wrapper--projects">
                    <div v-for="(item, index) in state.projects " :key="item.title" :ref="el =>  itemList.push(el)" class="project-single d-flex flex-column" :class="{'reverse': index%2 ===1}">
                        <div class="project-single-link">
                            <router-link  :to="{name: 'Project', params: {id: item.url }}" class="item-link d-flex flex-column">
                                <span :class="layout">0{{index + 1 }}. {{ item.title }}</span>
                                <img :src=" item.featured_img " alt="project-logo">
                            </router-link>

                            <img v-if="layout == 'light'" class="shadow" src="../../../assets/img/shadow.png" alt="shadow">
                            <img v-else class="shadow shadow-dark" src="../../../assets/img/shadow-dark.png" alt="shadow">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import { computed, reactive, onMounted, ref, onUpdated } from 'vue'
    import { useStore } from 'vuex'
    import axios from 'axios'
    import gsap from 'gsap'

    export default {
        name: "Projects-list",

        setup() {
            
            const store = useStore();

            const state = reactive({
                loaded: false,
                projects: []
            })

            const loaded = computed(() => store.state.theme.loaded );
            const layout = computed(() => store.state.theme.layout );
            const apiConnected = computed(() => store.state.theme.apiConnected );

            const updateWidgets = (widget) => {

                store.commit('updateWidgets', widget);
                store.commit('updateApiConnected', true);
            }

            const getList = () => {

                axios.get('https://arturchochla.usermd.net/portfolio')
                .then(response => {  
                    
                    let widget = response.data[0].widgets;
                    updateWidgets(widget);
                })
                .catch(e => {
                    console.log(e);
                })
            }

            const title = ref(null);
            const animation = ref(null);
            const itemList = ref([])

            const gsapAnimation = () => {

                gsap.to(title.value, {
                    scrollTrigger: {
                        trigger: animation.value,
                        scrub: true,
                        start: "top top",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 10,
                    opacity: 0,
                    autoAlpha: 0,
                    margin: '120 0 0 0'
                });

                itemList.value.filter((value) => {

                    gsap.to(value, {
                        scrollTrigger: {
                            trigger: value,
                            scrub: true,
                            start: "top top",
                            markers: false,
                            invalidateOnResize: false,
                        },
                        duration: 3,
                        opacity: 0,
                        scale: .93,
                        autoAlpha: 0,
                    });
                })
            }

            onMounted(()=> {

                if(!apiConnected.value){
                    getList();
                }
                state.loaded = loaded;
                state.projects = computed(() => store.state.widgets[0].projects );
            });

            onUpdated(()=> {
                setTimeout(() => {
                    gsapAnimation()
                }, 500);
            })

            return {
                state, loaded, layout, apiConnected , animation, title, itemList
            }
        }
    }
</script>

<style lang="scss" scoped>
    .projects-list {

        &__wrapper {
            position: relative;
            min-height: 500px;

            &--stripes {

                .stripe {
                    position: absolute;
                    width: 25%;
                    height: 100%;
                    top: 0px;
                    z-index: -1;
                    bottom: 0px;

                    &.overlay-1 {
                        left: 0px;
                        top: 60px;
                    }
                    &.overlay-2 {
                        left: 25%;
                        top: 40px;
                    }
                    &.overlay-3 {
                        left: 50%;
                        top: 90px;
                    }
                    &.overlay-4 {
                        left: 75%;
                        top: 120px;
                    }
                }

                &.dark {

                    .stripe {
                        background-color: rgb(23, 23, 23);
                    }
                }

                &.light {

                    .stripe {
                        background-color: rgb(230, 230, 230);
                    }
                }
            }

            &--title {
                position: relative;
                z-index: 2;
                .texts {
                    
                    h2 {
                        padding-top: 300px;
                        font-size: 13px;
                        margin-bottom: 30px;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                    }
                    h1 {
                        font-size: 80px;
                        padding-bottom: 200px;
                    }
                }

            }

            &--projects {
                position: relative;
                z-index: 3;
                padding-bottom: 150px;
                .project-single {
                    align-items: flex-end;

                    @media (min-width: 1296px) {
                        
                        &:nth-child(2n){
                            margin-top: -150px;
                        }

                        &:nth-child(3n){
                            margin-top: -150px;
                        }
                        &:nth-child(5n){
                            margin-top: -150px;
                        }
                    }

                    &.reverse {
                        align-items: flex-start;
                    }

                    &-link {
                        position: relative;

                        a {
                            padding: 0px;

                            span {
                                font-size: 11px;
                                text-transform: uppercase;
                                margin-left: 30px;
                                margin-bottom: 20px;

                                &.dark {
                                    color: rgba(255, 255, 255, 0.59);
                                }
                            }

                            img {
                                max-width: 620px;
                                z-index: 2;
                                position: relative;
                            }
                        }

                        .shadow {
                            max-width: 620px;
                            position: absolute;
                            bottom: -90px;
                            right: 10px;
                            opacity: .5;

                            &.shadow-dark {
                                opacity: 1;
                                transform: translateY(40%);
                                z-index: 1;
                                bottom: -30px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
