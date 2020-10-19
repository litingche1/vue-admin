import {reactive, toRefs} from '@vue/composition-api'
import {getCityPicker} from '@/utils/common'

export function CityPicker() {
    const data = reactive({
        provinceData: [],
        provinceValue: '',
        cityData: [],
        cityValue: '',
        areaData: [],
        areaValue: '',
        streetData: [],
        streetValue: ''
    })
    const resData = reactive({
        provinceValue: '',
        cityValue: '',
        areaValue: '',
        streetValue: ''
    })
    //获取省份
    const getCityPickerData = () => {
        getData({type: "province"})
    }
    //获取省、市、区数据
    const getData=(params)=>{
        getCityPicker(params).then(res => {
            data[`${params.type}Data`] = res.data.data.data
        }).catch(err => {
            console.log(err)
        })
    }
    //获取城市
    const changeProvince = () => {
        resultData('city')
        getData({type: "city", province_code: data.provinceValue})
    }
    //获取区县
    const changeCity = () => {
        resultData('area')
        getData({type: "area", city_code: data.cityValue})
    }
    const changeStreet = ()=>{
        resultData()
    }
    //获取街道
    const changeArea = () => {
        resultData('street')
        getData({type: "street", area_code: data.areaValue})
    }
    //下拉框值改变的时候先清除上一次的绑定的数据
    const resultData = params => {
        const arr = {
            city: ['cityValue', 'areaValue', 'streetValue'],
            area: ['areaValue', 'streetValue'],
            street: ['streetValue']
        }
        let arrData = arr[params]
        if (arrData) {
            arrData.forEach(item => data[item] = '')
        }
        traverseData()
    }
    //把选中的值返回父组件
    const traverseData = () => {
        for (let key in resData) {
            resData[key] = data[key]
        }
    }
    return {
        ...toRefs(data),
        resData,
        getCityPickerData,
        changeProvince,
        changeCity,
        changeArea,
        changeStreet
    }

}
