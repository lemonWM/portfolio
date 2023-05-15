<template>
    <section  v-if="loaded" class="hero-banner">
        <div class="container">
            <div class="hero-banner__wrapper" :class="{'active': loaded}">
                <div class="d-flex flex-row flex-wrap">
                    <div class="content">
                        <div  class="hero-banner__wrapper--logo">
                            <img v-if="layout == 'dark'" src="../../../assets/logo/logo-light.png" alt="art">
                            <img v-else src="../../../assets/logo/logo-dark.png" alt="art">
                        </div>
                        <div class="hero-banner__wrapper--details">
                            <span ref="trigger" class="trigger"></span>
                            <h1 ref="title">{{ state.texts.title }}</h1>
                            <h2 ref="desc1">{{ state.texts.desc_1 }}</h2>
                            <h3 ref="desc2">{{ state.texts.desc_2 }}</h3>
                            <h4 ref="desc3">{{ state.texts.desc_3 }}</h4>
                            <span ref="trigger2" class="trigger2"></span>
                            <span ref="desc4" class="desc4">scroll down to discover</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { computed, reactive, ref, onUpdated, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import gsap from 'gsap'
  
    export default {
        name: "Hero-banner",

        setup() {
            
            const store = useStore();

            const state = reactive({
                loaded: false,
                texts: {}
            })

            const loaded = computed(() => store.state.theme.loaded );
            const layout = computed(() => store.state.theme.layout );
            const data = computed(() => store.state.widgets[2].descriptions[0]);
            
            const trigger = ref(null);
            const trigger2 = ref(null);
            const title = ref(null);
            const desc1 = ref(null);
            const desc2 = ref(null);
            const desc3 = ref(null);
            const desc4 = ref(null);

            const gsapAnimation = () => {

                gsap.to(title.value, {
                    scrollTrigger: {
                        trigger: trigger.value,
                        scrub: true,
                        start: "top top",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 1,
                    opacity: 0,
                    autoAlpha: 0,
                    scale: .97
                });

                gsap.to(desc1.value, {
                    scrollTrigger: {
                        trigger: desc1.value,
                        scrub: true,
                        start: "top top",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 1,
                    opacity: 0,
                    autoAlpha: 0,
                    scale: .97
                });

                gsap.to(desc2.value, {
                    scrollTrigger: {
                        trigger: desc2.value,
                        scrub: true,
                        start: "top top",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 1,
                    opacity: 0,
                    autoAlpha: 0,
                    scale: .97
                });

                gsap.to(desc3.value, {
                    scrollTrigger: {
                        trigger: desc3.value,
                        scrub: true,
                        start: "top top",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 1,
                    opacity: 0,
                    autoAlpha: 0,
                    scale: .97
                });

                gsap.to(desc4.value, {
                    scrollTrigger: {
                        trigger: trigger2.value,
                        scrub: true,
                        start: "top top",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 1,
                    opacity: 0,
                    autoAlpha: 1,
                    scale: .99,
                });
            }

            onMounted(()=> {

                state.loaded = loaded;
                state.texts = data;
            });

            onUpdated(() => {

                gsapAnimation()
            })

            return {
                state, loaded, layout, data, trigger, trigger2, title, desc1, desc2, desc3, desc4
            }
        }
    }
</script>

<style lang="scss" scoped>

    .hero-banner {
        min-height: calc(100vh - 150px);

        &__wrapper {
            opacity: 1;

            &.active {
                @keyframes load {
                    from {opacity: 0;}
                    to {opacity: 1;}
                }
                .hero-banner__wrapper--logo {
                    padding-top: 150px;
                    opacity: 1;
                    animation-name: load;
                    animation-duration: 3s;

                    img {
                        max-width: 280px;
                    }
                }

                .hero-banner__wrapper--details {
                    opacity: 1; 
                    animation-name: load;
                    animation-duration: 4s;
                    max-width: 900px;

                    .trigger {
                        height: 150px;
                        display: block;
                    }
                    .trigger2 {
                        height: 140px;
                        display: block;
                    }

                    h1 {
                        
                        font-size: 44px;
                        text-transform: uppercase;
                        font-weight: 500;
                        letter-spacing: 2px;
                    }
                    h2, h3, h4 {
                        margin-top: 70px;
                        font-size: 20px;
                        font-weight: 400;
                        letter-spacing: 2px;
                        line-height: 30px;
                    }

                    h3, h4 {
                        margin-top: 30px;
                    }

                    span {
                        font-size: 11px;
                        text-transform: uppercase;
                        font-weight: 300;
                        letter-spacing: 2px;
                    }
                    .desc4 {
                        display: block;
                    }
                }
            }            
        }
    }

</style>