<template>
    <section class="preloader">
        <div class="preloader__wrapper" :class="{'active': state.loaded}">
            <span class="preloader__wrapper--line-1 line"></span>
            <span class="preloader__wrapper--line-2 line"></span>
            <span class="preloader__wrapper--line-3 line"></span>
        </div>

        <div class="preloader__counter" :class="{'active': state.loaded, 'active-hide': state.loadedCompleted}">
            <div class="counter">{{ state.counter }}<span>%</span></div>
        </div>

        <div v-if="!state.switchedLayout" class="preloader__stripes dark init">
            <div class="wrapper">
                <span class="preloader__stripes--overlay-static overlay-1"></span>
                <span class="preloader__stripes--overlay-static overlay-2"></span>
                <span class="preloader__stripes--overlay-static overlay-3"></span>
                <span class="preloader__stripes--overlay-static overlay-4"></span>
            </div>
        </div>

        <div v-else class="preloader__stripes" :class="state.layout">
            <div v-if="state.layout == 'dark'" class="wrapper_dark">
                <span class="preloader__stripes--overlay overlay-1"></span>
                <span class="preloader__stripes--overlay overlay-2"></span>
                <span class="preloader__stripes--overlay overlay-3"></span>
                <span class="preloader__stripes--overlay overlay-4"></span>
            </div>
            <div v-else class="wrapper_light">
                <span class="preloader__stripes--overlay overlay-1"></span>
                <span class="preloader__stripes--overlay overlay-2"></span>
                <span class="preloader__stripes--overlay overlay-3"></span>
                <span class="preloader__stripes--overlay overlay-4"></span>
            </div>
        </div>

    </section>
</template>

<script>
    import { onMounted, reactive, computed } from 'vue'
    import { useStore } from 'vuex'


    export default {
        name: 'preloader',

        setup() {

            const store = useStore();

            const state = reactive({
                loaded: false,
                loadedCompleted: false,
                counter: 0,
                layout:'',
                switchedLayout: false
            })

            const layout = ()=> {

                state.layout = computed(() => store.state.theme.layout )
            }
            const switchedLayout = () => {

                state.switchedLayout = computed(() => store.state.theme.switchedLayout )
            }

            const counter = () => {

                const max = 100
                const interval = 4*1000 / max

                const loop = setInterval(() => {
                   
                    if(state.counter == max){

                        stopLoop();
                        state.loadedCompleted = !state.loadedCompleted

                        store.commit('updateThemeLoaded', true)
                        
                    } else {

                        state.counter++
                    }
                    
                }, interval);

                const stopLoop = () => {

                    clearInterval(loop)
                } 
            }

            onMounted(() => {

                state.loaded = true;
                layout()
                counter()
                switchedLayout()
            })

            return {
                state, layout, switchedLayout
            }
        }
    } 

</script>

<style lang="scss" scoped>

    .preloader {

        &__wrapper {
            position: relative;

            .line {
                display: block;
                width: 1px;
                height: 100%;
                position: fixed;
                background: hsla(0, 0%, 48.6%, .2);
                z-index: 1;
                pointer-events: none;
            }

            &--line-1 {
                left: 25%;
            }
            &--line-2 {
                left: 50%;
            }
            &--line-3 {
                left: 75%;
            }

            &.active {
                @keyframes line_1 {
                    from {height: 0;}
                    to {height: 100%;}
                }
                @keyframes line_2 {
                    from {height: -100%;}
                    to {height: 100%;}
                }
                @keyframes line_3 {
                    from {height: 0;}
                    to {height: 100%;}
                }

                .preloader__wrapper--line-1 {
                    animation-name: line_1;
                    animation-duration: 3s;
                    top: 0;
                }
                .preloader__wrapper--line-2 {
                    animation-name: line_3;
                    animation-duration: 3s;
                    bottom: 0px;
                }
                .preloader__wrapper--line-3 {
                    animation-name: line_3;
                    animation-duration: 4s;
                    top: 0;
                }
            }
        }

        &__counter {
            position: relative;
            
            .counter {
                position: fixed;
                left: 52%;
                top: 20px;
                color: hsla(0, 0%, 48.6%);
                display: flex;

                span {
                    font-size: 12px;
                    color: hsla(0, 0%, 48.6%) !important;
                }
            }

            &.active {

                @keyframes counter {
                    from {top: 100%;}
                    to {top: 15px;}
                }
                .counter {
                    animation-name: counter;
                    animation-duration: 5s;
                }
            }
            &.active-hide {
                

                @keyframes counterFinished {
                    from {opacity: 1;}
                    to {opacity: 0;}
                }

                .counter {
                    opacity: 0;
                    animation-name: counterFinished;
                    animation-duration: 1s;
                }
            }
        }

        &__stripes {

            &--overlay {
                position: fixed;
                z-index: -2;
                height: 0px;
                width: 25%;
                height: 100%;
                bottom: 0px;
                background-color: #e1e1e1;
                max-height: 100vh;
                &.overlay-1 {
                    left: 0;
                }
                &.overlay-2 {
                    left: 25%;
                }
                &.overlay-3 {
                    left: 50%;
                }
                &.overlay-4 {
                    left: 75%;
                }
            }

            @keyframes stripe {
                from {height: 0;}
                to {height: 100%;}
            }
            &.dark.init {
                .preloader__stripes--overlay {
                    
                    background-color: #0f0f0f;
                }
            }
            &.dark {

                .preloader__stripes--overlay{
                    
                    background-color: #0f0f0f;
                }

                .overlay-1 {
                    animation-name: stripe;
                    animation-duration: .7s;
                }
                .overlay-2 {
                    animation-name: stripe;
                    animation-duration: .8s;
                }
                .overlay-3 {
                    animation-name: stripe;
                    animation-duration: .95s;
                }
                .overlay-4 {
                    animation-name: stripe;
                    animation-duration: .8s;
                }
            }

            &.light {

                .preloader__stripes--overlay {
                    
                    background-color: #e1e1e1;
                   
                }
                .overlay-1 {
                    animation-name: stripe;
                    animation-duration: .7s;
                }
                .overlay-2 {
                    animation-name: stripe;
                    animation-duration: .8s;
                }
                .overlay-3 {
                    animation-name: stripe;
                    animation-duration: .95s;
                }
                .overlay-4 {
                    animation-name: stripe;
                    animation-duration: .8s;
                }
            }
        }
    }

</style>