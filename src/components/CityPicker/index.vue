<template>
    <div class="over-hidden">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-select v-model="provinceValue" placeholder="请选择分类" @change="changeProvince">
                    <el-option
                            v-for="item in provinceData"
                            :key="item.PROVINCE_CODE"
                            :label="item.PROVINCE_NAME"
                            :value="item.PROVINCE_CODE">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="cityValue" placeholder="请选择分类" @change="changeCity">
                    <el-option
                            v-for="item in cityData"
                            :key="item.CITY_CODE"
                            :label="item.CITY_NAME"
                            :value="item.CITY_CODE">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="areaValue" placeholder="请选择分类" @change="changeArea">
                    <el-option
                            v-for="item in areaData"
                            :key="item.AREA_CODE"
                            :label="item.AREA_NAME"
                            :value="item.AREA_CODE">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="streetValue" placeholder="请选择分类">
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

    export default {
        name: "index",
        props: {
            confingCityData: {
                type: Object,
                default: () => {
                }
            }
        },
        setup(props) {
            console.log(props)
            const {getCityPickerData, provinceValue, provinceData, changeProvince, cityData, cityValue, changeCity, areaData, areaValue, changeArea, streetData, streetValue} = CityPicker()
            getCityPickerData()
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
                streetData
            }
        }
    }
</script>

<style scoped>
    .over-hidden {
        overflow: hidden;
    }
</style>
