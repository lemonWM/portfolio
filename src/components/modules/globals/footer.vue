<template>
   
    <section v-if="loaded" class="footer">
        <div class="container-sm">
            <div class="footer__wrapper">
                <div class="footer__wrapper--section d-flex flex-row">
                    <div class="links">
                        <router-link to="/">Home</router-link>
                        <router-link to="/stack">Skills & stack</router-link>
                    </div>
                    <div class="contact">
                        <a href="tel:+48662744552">phone</a>
                        <a href="mailto:arturchochla@gmail.com">mail</a>
                    </div>
                </div>

            </div>
        </div>
    </section>

</template>
  
<script>
    import { computed, reactive, onMounted } from 'vue'
    import { useStore } from 'vuex'

    export default {
        name: 'footer',

        setup() {

            const store = useStore();

            const state = reactive({
                loaded: false
            })

            const loaded = computed(() => store.state.theme.loaded );

            onMounted(() => {
                state.loaded = loaded;
            })

            return {
                state,loaded
            }
        }
    } 
</script>

<style lang="scss" scoped>

    .footer {

        &__wrapper {
            padding-top: 200px;
            padding-bottom: 50px;
            width: 100%;

            &--section {
                width: 100%;
                justify-content: space-between;

                a {
                    padding-right: 20px;
                    font-size: 11px;
                    text-transform: uppercase;
                    font-weight: 600;
                    
                    &:last-of-type {
                        padding-right: 0px;
                    }
                }
            }
        }
    }
</style>