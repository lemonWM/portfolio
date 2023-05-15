
<script>
    import preloader from './components/modules/globals/preloader.vue'
    import headerSimple from './components/modules/globals/header.vue'
    import footerSimple from './components/modules/globals/footer.vue'

    import { computed } from 'vue'
    import { useStore } from 'vuex'

    export default {
        components: {
            headerSimple,
            preloader,
            footerSimple
        },

        setup(){
            const store = useStore();

            const layout = computed(() => store.state.theme.layout )
            const switched = computed(() => store.state.theme.switchedLayout )
            return {
                layout, switched
            }
        }
    }
</script>

<template>
    <div class="main" :class="layout">
        <div class="main__wrapper" :class="{ 'active-mode': switched}">
            
            <div class="preloader-container">
                <preloader />
            </div>

            <div class="header-container">
                <headerSimple />
            </div>
            
            <div class="body-container">
                <router-view />
            </div>
            
            <div class="footer-container">
                <footerSimple />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .main__wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        display: flex;
        flex-direction: column;
        z-index: 1;
    }
    .dark .active-mode {
        
        background-color: #e1e1e1;
    }
    .light .active-mode {
        background: #0f0f0f; 
    }

</style>