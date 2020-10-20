<template>
    <div class="over-hidden">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-select v-if="initCityPicker.province" v-model="provinceValue" placeholder="请选择分类" @change="changeProvince">
                    <el-option
                            v-for="item in provinceData"
                            :key="item.PROVINCE_CODE"
                            :label="item.PROVINCE_NAME"
                            :value="item.PROVINCE_CODE">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-if="initCityPicker.city" v-model="cityValue" placeholder="请选择分类" @change="changeCity">
                    <el-option
                            v-for="item in cityData"
                            :key="item.CITY_CODE"
                            :label="item.CITY_NAME"
                            :value="item.CITY_CODE">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-if="initCityPicker.area" v-model="areaValue" placeholder="请选择分类" @change="changeArea">
                    <el-option
                            v-for="item in areaData"
                            :key="item.AREA_CODE"
                            :label="item.AREA_NAME"
                            :value="item.AREA_CODE">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-if="initCityPicker.street" v-model="streetValue" placeholder="请选择分类" @change="changeStreet">
                    <el-option
                            v-for="item in streetData"
                            :key="item.STREET_CODE"
                            :label="item.STREET_NAME"
                            :value="item.STREET_CODE">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {CityPicker} from './config'
    import {watch} from '@vue/composition-api'
    import {reactive} from '@vue/composition-api'
    export default {
        name: "index",
        props: {
            configCityData: {
                type: Object,
                default: () => {
                }
            },
            cityConfig:{
                type:Array,
                default:()=>[]
            }
        },
        setup(props, {emit}) {
            const initCityPicker=reactive({
                province:false,
                city:false,
                area:false,
                street:false,
            })
            const {getCityPickerData, provinceValue, provinceData, changeProvince, cityData, cityValue, changeCity, areaData, areaValue, changeArea, streetData, streetValue, resData,changeStreet} = CityPicker()
            getCityPickerData()
            //监听
            watch([
                () => resData.provinceValue,
                () => resData.cityValue,
                () => resData.areaValue,
                () => resData.streetValue,
            ], () => {
                emit("update:confingCityData", resData)
            })
            //初始化配置
            const setInit = ()=>{
                let data=props.cityConfig
                if(data.length<1){
                    for(let key in initCityPicker){
                        initCityPicker[key]=true
                    }
                }else{
                    data.forEach(item=>{
                        initCityPicker[item]=item
                    })
                }
            }
            setInit()
            return {
                provinceValue,
                provinceData,
                changeProvince,
                cityData,
                cityValue,
                changeCity,
                areaData,
                areaValue,
                changeArea,
                streetValue,
                streetData,
                changeStreet,
                initCityPicker
            }
        }
    }
</script>

<style scoped>
    .over-hidden {
        overflow: hidden;
    }
</style>
