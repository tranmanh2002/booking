import React, {Component} from "react";
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import moment, { lang } from "moment";
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorByDate } from "../../../services/userService";
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component{

    constructor(props){
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        }
    }
    async componentDidMount(){
        let {language} = this.props;
        let allDays = this.getArrDays(language);
        if(this.props.doctorIDFromParent){
            let res = await getScheduleDoctorByDate(this.props.doctorIDFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
        this.setState({
            allDays: allDays
        })
        // console.log("check alldays: ", allDays)

    }
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays = (language) =>{
        let allDays = []
        for (let i = 0; i < 7; i++){
            let object = {};
                if(language === LANGUAGES.VI){
                    //gán giá trị ngày hôm nay
                    if(i === 0){
                        let ddMM = moment(new Date()).format('DD/MM');
                        let today = `Hôm nay - ${ddMM}`;
                        object.label = today;
                    }else{
                        let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                        object.label = this.capitalizeFirstLetter(labelVi)
                    }
                }
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
                allDays.push(object);
            }
            return allDays;
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            let allDays = this.getArrDays(this.props.language);
            this.setArrDays({
                allDays: allDays
            });
        }
        if(this.props.doctorIDFromParent !== prevProps.doctorIDFromParent){
            let allDays = this.getArrDays(this.props.language);
            //lấy thông tin today schedule
            let res = await getScheduleDoctorByDate(this.props.doctorIDFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }
    
    handleOnChangeSelect = async(event) =>{
        if(this.props.doctorIDFromParent && this.props.doctorIDFromParent !== -1){
            let doctorID = this.props.doctorIDFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorID, date);
            if(res && res.errCode === 0){
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            // console.log('check res schedule from react: ', res)
        }
    }
    handleClickScheduleTime = (time) =>{
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
        console.log("check time: ", time)
    }
    closeBookingClose = () =>{
        this.setState({
            isOpenModalBooking: false
        })
    }
    render(){
        let {allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal} = this.state;
        let {language} = this.props
        return (
            <React.Fragment>
                <BookingModal className='bookingmodal'
                    isOpenModal = {isOpenModalBooking}
                    closeBookingClose = {this.closeBookingClose}
                    dataTime = {dataScheduleTimeModal}
                ></BookingModal>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {/* Lấy tất cả ngày */}
                            {allDays && allDays.length > 0 &&
                                    allDays.map((item, index) =>{
                                        return(
                                            <option 
                                                value={item.value}
                                                key= {index}
                                            >
                                                {item.label}
                                            </option>
                                        )
                                    })
                                }
                        </select>
                        </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <i className="fas fa-calendar-alt">
                                <span>lịch khám </span>
                            </i>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className="time-content-btns">
                                        {allAvailableTime.map((item, index) =>{
                                            let timeDisplay = language === LANGUAGES.VI ? 
                                            item.timeTypeData.valueVi : '';
                                            return (
                                                <button key={index}
                                                    className ='btn-vie'
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className="book-free">
                                        <span>
                                            Đặt <i className="far fa-hand-point-up"></i> lịch khám
                                        </span>
                                    </div>
                                </>
                                : <div className="no-schedule">
                                        Bác sĩ không có lịch hẹn khám bệnh
                                </div>
                            }
                        </div>
                    </div>
                </div>
                
            </React.Fragment> 
        );
    }
}
const mapStateToProps = state =>{
    return{
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch =>{
    return{

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);