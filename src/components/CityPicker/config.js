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
    const getCityPickerData = () => {
        getCityPicker({type: "province"}).then(res => {
            data.provinceData = res.data.data.data
            console.log(res.data.data.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const changeProvince = () => {
        data.cityData = ''
        data.cityValue = ''
        getCityPicker({type: "city", province_code: data.provinceValue}).then(res => {
            data.cityData = res.data.data.data
            console.log(res.data.data.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const changeCity = () => {
        data.areaData = ''
        data.areaValue = ''
        getCityPicker({type: "area", city_code: data.cityValue}).then(res => {
            data.areaData = res.data.data.data
            console.log(res.data.data.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const changeArea = () => {
        data.streetData = ''
        data.streetValue = ''
        getCityPicker({type: "street", area_code: data.areaValue}).then(res => {
            data.streetData = res.data.data.data
            console.log(res.data.data.data)
        }).catch(err => {
            console.log(err)
        })
    }
    return {
        ...toRefs(data),
        getCityPickerData,
        changeProvince,
        changeCity,
        changeArea
    }

}
