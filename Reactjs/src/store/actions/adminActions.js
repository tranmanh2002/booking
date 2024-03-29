import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService, getAllSpecialty, getAllClinic } from '../../services/userService';
import {toast} from "react-toastify"


export const fetchGenderStart = () =>{
    return async(dispatch, getState) =>{
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))

            }else{
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetch gender: ', error)
        }
    }
}
export const fetchGenderSuccess = (genderData) =>({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () =>({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionStart = () =>{
    return async(dispatch, getState) =>{
        try {
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data))

            }else{
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionSuccess());
        }
    }
}
export const fetchPositionSuccess = (positionData) =>({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () =>({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleStart = () =>{
    return async(dispatch, getState) =>{
        try {
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data))

            }else{
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log(error)
        }
    }
}
export const fetchRoleSuccess = (roleData) =>({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () =>({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const createNewUser = (data) =>{
    return async(dispatch, getState) =>{
        try {
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                toast.success("Tạo người dùng thành công!")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())

            }else{
                toast.error("Tạo người dùng không thành công")
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log(error)
        }
    }
}
export const saveUserSuccess = () =>({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const saveUserFailed = () =>({
    type: actionTypes.CREATE_USER_FAILED,
})

export const fetchAllUsersStart = () =>{
    return async(dispatch, getState) =>{
        try {
            let res = await getAllUsers("ALL");
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()))

            }else{
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log(error)
        }
    }
}
export const fetchAllUsersSuccess = (data) =>({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () =>({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const deleteAnUser = (userID) =>{
    return async(dispatch, getState) =>{
        try {
            let res = await deleteUserService(userID);
            if(res && res.errCode === 0){
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart())
                toast.success("Xóa người dùng thành công!")

            }else{
                toast.error("Xóa người dùng không thành công!")

                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log(error)
        }
    }
}
export const deleteUserSuccess = (data) =>({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () =>({
    type: actionTypes.DELETE_USER_FAILED,
})

export const editAnUser = (data) =>{
    return async(dispatch, getState) =>{
        try {
            let res = await editUserService(data);
            if(res && res.errCode === 0){
                toast.success("Chỉnh sửa người dùng thành công!")
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart())

            }else{
                toast.success("Chỉnh sửa người dùng không thành công!")
                dispatch(editUserFailed());
            }
        } catch (error) {
            dispatch(editUserFailed());
            console.log(error)
        }
    }
}
export const editUserSuccess = (data) =>({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () =>({
    type: actionTypes.EDIT_USER_FAILED,
})

export const fetchTopDoctor = () =>{
    return async(dispatch, getState) =>{
        try {
            let res = await getTopDoctorHomeService('');
            if(res && res.errCode === 0){
                // toast.success("Cập nhật người dùng thành công!")
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data

                });

            }else{
                // toast.success("Cập nhật người dùng không thành công!")
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,

                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            });
            console.log(error)
        }
    }
}

export const fetchAllDoctors = () =>{
    return async(dispatch, getState) =>{
        try {
            let res = await getAllDoctors();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDtrs: res.data

                });

            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            });
            console.log(error)
        }
    }
}

export const saveDetailDoctor = (data) =>{
    return async(dispatch, getState) =>{
        try {
            let res = await saveDetailDoctorService(data);
            if(res && res.errCode === 0){
                toast.success("Lưu thông tin bác sĩ thành công!")

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    dataDtrs: res.data

                });

            }else{
                toast.success("Lưu thông tin bác sĩ không thành công!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
            console.log(error)
        }
    }
}

export const fetchAllScheduleTime = () =>{
    return async(dispatch, getState) =>{
        try {
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0){

                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data

                });

            }else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
            console.log(error)
        }
    }
}

export const getAllRequiredDoctorInfor = () =>{
    return async(dispatch, getState) =>{
        try {
            dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty("SPECIALTY");
            let resClinic = await getAllClinic("CLINIC");


            if(resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
                ){
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));

            }else{
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log(error)
        }
    }
}
export const fetchRequiredDoctorInforSuccess = (allRequiredData) =>({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFailed = () =>({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
})
