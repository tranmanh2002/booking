import React , {Component} from "react";
import {connect} from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import {saveBulkScheduleDoctor} from '../../../services/userService';

class ManageSchedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    buildDataInputSelect = (inputData) =>{
        let result = [];
        if (inputData && inputData.length > 0){
            inputData.map((item, index) =>{
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`
                object.label = labelVi;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime;
            if(data && data.length>0){
                data = data.map(item => ({...item, isSelected: false}))
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    
    handleChangeSelect = async (selectedOption) =>{
        this.setState({
            selectedDoctor: selectedOption
        })
    }
    handleOnChangeDatePicker = (date) =>{
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) =>{
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0){
            //tao su kien chon rangetime
            rangeTime = rangeTime.map(item =>{
                if(item.id === time.id){
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = async() =>{
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        let result = [];
        //check invalid
        if(!currentDate){
            toast.error("Chưa chọn ngày!");
            return
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Chưa chọn bác sĩ!");
            return;
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formatedDate = new Date(currentDate).getTime();
        //lọc thời gian hẹn, build object time
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map((schedule, index) =>{
                    let object = {};
                    object.doctorID = selectedDoctor.value; // value: label
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            }else{
                toast.error("Chưa chọn thời gian!");
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorID: selectedDoctor.value,
            formatedDate: formatedDate
        })
        // console.log("check res: savebulkScheduleDoctor: ", res)
        // console.log("check result: ", result)
        if(res && res.errCode === 0){
            toast.success('Lưu thông tin thành công!')
        }else{
            toast.error("Đã xảy ra lỗi")
        }
    }
    render(){
        let {rangeTime} = this.state;
        //Chọn ngày hôm nay
        let today = new Date(new Date().setDate(new Date().getDate() - 1));
        return(
           <div className="manage-schedule-container">
                <div className="m-s-title">
                    Quản lý lịch khám bệnh của Bác sĩ
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Chọn bác sĩ</label>
                            <Select
                                value = {this.state.selectedDoctor}
                                onChange = {this.handleChangeSelect}
                                options = {this.state.listDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                Chọn ngày
                            </label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate = {today}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) =>{
                                    return(
                                        <button className={item.isSelected === true? "btn btn-schedule active" : "btn btn-schedule"} 
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {item.valueVi}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className="col-12"> 
                            <button className="btn btn-primary btn-save-schedule"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                Lưu thông tin
                            </button>
                        </div>
                    </div>
                </div>
           </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,

    };
};
const mapDispatchToProps = dispatch =>{
    return{
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);