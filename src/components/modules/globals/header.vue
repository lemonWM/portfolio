<template>
   
    <header ref="trigger" class="navigation">
        <div class="container">
            <div ref="navigation" v-if="state.loaded" class="navigation__wrapper">
                <button v-if="state.layout == 'dark'" @click="lightMode">Light mode</button>
                <button v-else @click="darkMode">Dark mode</button>
                
                <router-link to="/">Home</router-link>
                <router-link to="/stack">Skills & stack</router-link>
            </div>
        </div>
    </header>

</template>
  
<script>
    import { computed, reactive, onMounted, ref, onUpdated } from 'vue'
    import { useStore } from 'vuex'
    import gsap from 'gsap'
    import ScrollTrigger from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);

    export default {
        name: "header",

        setup() {
            
            const store = useStore();

            const state = reactive({
                loaded: false,
                layout: ''
            })

            const navigation = ref(null);
            const trigger = ref(null)

            const loaded = computed(() => store.state.theme.loaded );
            const layout = computed(() => store.state.theme.layout );

            const reloadAfterLayout = () => {

                store.commit('updateThemeLoaded', false);

                setTimeout(() => {
                    
                    store.commit('updateThemeLoaded', true);
                }, 800);         
            }

            const lightMode = () => {

                store.commit('updateLayout', 'light');
                store.commit('updateSwitchedLayout', true);

                reloadAfterLayout()
            }

            const darkMode = () => {
                
                store.commit('updateLayout', 'dark');

                reloadAfterLayout();
            }

            const gsapAnimation = () => {

                gsap.to(navigation.value, {
                    scrollTrigger: {
                        trigger: trigger.value,
                        scrub: true,
                        start: "top top",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 10,
                    opacity: 0,
                    autoAlpha: 0
                });
            }

            onMounted(()=> {

                state.loaded = loaded;
                state.layout = layout;
            })

            onUpdated(() => {

                gsapAnimation()
            })

            return {
                state, lightMode, darkMode, loaded, layout, navigation, trigger
            }
        }
    }
</script>

<style lang="scss" scoped>

    .navigation {

        @media (min-width: 992px) {
            padding-top: 150px;
        }

        @keyframes load {
            from {opacity: 0;}
            to {opacity: 1;}
        }

        &__wrapper {
            opacity: 1;
            //animation-name: load;
            //animation-duration: 1s;

            @media (max-width: 768px) {
                padding-top: 60px;
            }

            button {
                font-size: 14px;
                letter-spacing: 1.5px;
                text-transform: uppercase;
            }
            a {
                font-size: 14px;
                letter-spacing: 1.5px;
                text-transform: uppercase;
            }

            @media (max-width: 768px) {
                button, a {
                    font-size: 12px !important;
                    padding: 0px 30px 0px 0px !important;
                }
            }

            .router-link-exact-active {
                font-weight: 600;
            }
        }
    }
</style>