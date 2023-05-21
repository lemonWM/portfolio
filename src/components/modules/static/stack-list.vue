<template>
    <section class="stack-list">
        <div v-if="loaded" class="stack-list__wrapper container-sm">
            <div ref="trigger" class="trigger"></div>
            <div ref="list" class="stack-list__wrapper--items">
                <div v-for="(item, index) in state.stack" :key="item.title" :ref="el =>  itemList.push(el)" class="single d-flex flex-column">
                    <div class="item">
                        <div class="item-main d-flex flex-row">
                            <span class="index">0{{index + 1 }}.</span>
                            <span class="title">{{ item.title }}</span>
                        </div>
                        <div class="item-desc">
                            <span>{{ item.description }}</span>
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
    import gsap from 'gsap'

    export default {
        name: "Projects-list",

        setup() {
            
            const store = useStore();

            const state = reactive({
                loaded: false,
                stack: []
            })

            const loaded = computed(() => store.state.theme.loaded );
            const layout = computed(() => store.state.theme.layout );
            const stack = computed(() => store.state.widgets[1].stack)

            const trigger = ref(null);
            const list = ref(null);
            const itemList = ref([])

            const gsapAnimation = () => {

                gsap.to(list.value, {
                    scrollTrigger: {
                        trigger: trigger.value,
                        scrub: true,
                        start: "center center",
                        markers: false,
                        invalidateOnResize: true,
                    },
                    duration: 1,
                    marginTop: '-190'
                });

                itemList.value.filter((value) => {

                    gsap.to(value, {
                        scrollTrigger: {
                            trigger: value,
                            scrub: true,
                            start: "center center",
                            markers: false,
                            invalidateOnResize: false,
                        },
                        duration: 3,
                        opacity: 0,
                        scale: .97,
                        autoAlpha: 0,
                        marginLeft: '-50px'
                    });
                })
            }

            onMounted(()=> {

                state.stack = stack;
            });

            onUpdated(()=> {

                setTimeout(() => {
                    
                    gsapAnimation();
                }, 300);
            })

            return {
                state, loaded, layout, stack, trigger, list, itemList 
            }
        }
    }
</script>

<style lang="scss" scoped>
    .stack-list {

        &__wrapper {
            padding-bottom: 140px;

            @media (max-width: 7868px) {
                padding-bottom: 70px;
            }

            .trigger {
                display: block;
                height: 140px;

                @media (max-width: 7868px) {
                    height: 80px;
                }
            }

            .single {

                &:hover .item-desc {
                    opacity: 1;
                } 
                .item {
                    position: relative;

                    &-main {
                        align-items: center;
                        padding: 35px 0px 0px;
                        .index {
                            font-size: 12px;
                            font-weight: 600;
                            opacity: .5;
                            margin-right: 20px;
                        }
                        .title {
                            font-size: 65px;
                            letter-spacing: -3px;
                            color: #191b1d;
                            font-weight: 500;

                            @media (max-width: 7868px) {
                                font-size: 30px;
                            }
                        }
                    }

                    &-desc {
                        opacity: 0;
                        transition: all .3s;
                        padding-left: 50px;

                        @media (max-width: 7868px) {
                            opacity: 1;
                        }
                    }
                }

                @media (max-width: 768px) {
                    margin-left: 0px !important;
                    opacity: 1 !important;
                }
            }

            @media (max-width: 7868px) {
            
                &--items {
                    margin-top: 0px !important;
                }
            }
        }
    }

</style>
