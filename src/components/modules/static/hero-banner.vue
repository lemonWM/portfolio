<template>
    <section ref="trigger" v-if="loaded" class="hero-banner">
        <div class="container">
            <div class="hero-banner__wrapper" :class="{'active': loaded}">
                <div class="d-flex flex-row flex-wrap">
                    <div class="content">
                        <div class="hero-banner__wrapper--logo">
                            <img v-if="layout == 'dark'" src="../../../assets/logo/logo-light.png" alt="art">
                            <img v-else src="../../../assets/logo/logo-dark.png" alt="art">
                        </div>
                        <div class="hero-banner__wrapper--details">
                            <h2>interactive portfolio</h2>
                            <h3>projects & design</h3>
                            <h4>scroll down to discover</h4>
                        </div>
                    </div>
                    <div class="images d-flex flex-column" :class="{'active': loaded}">
                        <div class="image-section image-section-1">
                            <img ref="image" src="../../../assets/img/hero-home-code.png" alt="code">
                        </div>
                        <div class="image-section image-section-2">
                            <img src="../../../assets/img/hero-home-SEO.png" alt="seo">
                        </div>
                        <div class="image-section image-section-3">
                            <img src="../../../assets/img/pinpng.com-hubspot-logo-png-3152521.png" alt="hubspot">
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
                loaded: false
            })

            const loaded = computed(() => store.state.theme.loaded );
            const layout = computed(() => store.state.theme.layout );

            const trigger = ref(null);
            const image = ref(null);

            const gsapAnimation = () => {

                gsap.to(image.value, {
                    scrollTrigger: {
                        trigger: trigger.value,
                        scrub: true,
                        start: "top top",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 1,
                    opacity: 0,
                    margin: '100 -140 0 0'
                });
            }

            onMounted(()=> {

                state.loaded = loaded;

                gsapAnimation(); 
            });

            onUpdated(()=> {

                setTimeout(() => {

                    gsapAnimation(); 
                }, 300);
            })

            return {
                state, loaded, layout, trigger, image
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
                    animation-duration: 5s;

                    img {
                        max-width: 280px;
                    }
                }

                .hero-banner__wrapper--details {
                    opacity: 1; 
                    animation-name: load;
                    animation-duration: 8s;

                    h2 {
                        margin-top: 60px;
                        font-size: 14px;
                        text-transform: uppercase;
                        font-weight: 300;
                        letter-spacing: 2px;
                    }
                    h3 {
                        margin-top: 10px;
                        font-size: 13px;
                        text-transform: uppercase;
                        font-weight: 300;
                        letter-spacing: 2px;
                    }

                    h4 {
                        margin-top: 260px;
                        font-size: 11px;
                        text-transform: uppercase;
                        font-weight: 300;
                        letter-spacing: 2px;
                    }
                }
            }


            .images {
                width: 70%;

                &.active {

                    .image-section {

                        img {
                            opacity: 1;
                        }
                    }
                    @keyframes img1 {
                        from {opacity: 0; margin-top: -40px;}
                        to {opacity: 1;margin-top: -100;}
                    }
                    @keyframes img2 {
                        from {opacity: 0}
                        to {opacity: 1}
                    }
                    @keyframes img3 {
                        0% {opacity: 0;}
                        75% {opacity: .3;}
                        85% {opacity: .5;}
                        100% {opacity: 1;}
                    }
                    .image-section-1 {
                        img {
                           // animation-name: img1;
                           // animation-duration: 1s;
                        }
                    }
                    .image-section-2 {
                        img {
                            animation-name: img2;
                            animation-duration: 4s;
                        }
                    }
                    .image-section-3 {
                        img {
                            animation-name: img3;
                            animation-duration: 2s;
                        }
                    }
                }

                .image-section-1 {
                    display: flex;
                    justify-content: end;

                    img {
                        margin-top: -100px;
                        max-width: 500px;
                        margin-right: -200px;
                        z-index: 2;
                    }
                }
                .image-section-2 {
                    display: flex;
                    justify-content: center;
                    img {
                        z-index: 2;
                        max-width: 400px;
                        margin-top: -150px;
                    }
                }

                .image-section-3 {
                    display: flex;
                    justify-content: flex-end;
                    img {
                        z-index: 2;
                        height: 100px;
                        margin-top: -150px;
                    }
                }
            }
            
        }
    }

</style>