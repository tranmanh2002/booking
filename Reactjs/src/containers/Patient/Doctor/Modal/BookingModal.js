import React, {Component} from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import './BookingModal.scss';
import ProfileDoctor from '../ProfileDoctor';
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from '../../../../store/actions';
import { LANGUAGES } from "../../../../utils";
import Select from 'react-select';
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";

class BookingModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorID: '',
            genders: '',
            timeType: '',

        }
    }
    async componentDidMount(){
        this.props.getGenders();
    }
    buildDataGender = (data) =>{
        let result = [];
        if(data && data.length>0){
            data.map(item =>{
                let object = {};
                object.label = item.valueVi;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
   
       if(this.props.genders !== prevProps.genders){
        this.setState({
            genders: this.buildDataGender(this.props.genders)
        })
       }
       if(this.props.dataTime !== prevProps.dataTime){
        if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
            let doctorID = this.props.dataTime.doctorID;
            let timeType = this.props.dataTime.timeType;
            this.setState({
                doctorID: doctorID,
                timeType: timeType
            })
        }
       }
    }
    handleOnchangeInput = (event, id) =>{
        let valueInput = event.target.value;
        let stateCopy = {...this.state};
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    showHideDetailInfor = (status) =>{
        this.setState({
            isShowDetailInfor: status
        })
    }
    handleOnchangeDatePicker = (date) =>{
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectedOption) =>{
        this.setState({
            selectedGender: selectedOption
        })
    }
    handleConfirmBooking = async() =>{
        let date = new Date(this.state.birthday).getTime();

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorID: this.state.doctorID,
            timeType: this.state.timeType,
        })
        if(res && res.errCode === 0) {
            toast.success('Đặt lịch hẹn khám bệnh thành công!')
            this.props.closeBookingClose();
        }else{
            toast.error('Đặt lịch hẹn khám bệnh không thành công!')

        }
    }
    render(){
        let {isOpenModal, closeBookingClose, dataTime}= this.props;
        let doctorID = '';
        if(dataTime && !_.isEmpty(dataTime)){
            doctorID = dataTime.doctorID
        }
        console.log("check data time: ", dataTime)
        return (
           <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}   
                size="lg"
                centered
           >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">Thông tin đặt lịch khám bệnh</span>
                        <span
                            className="right"
                            onClick={closeBookingClose}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorID={doctorID}
                                isShowDescriptionDoctor = {false}
                                dataTime = {dataTime}
                                isShowLinkDetail = {false}
                                isShowPrice = {true}
                            />
                        </div>
                        {/* <div className="price">
                            Giá khám 50000
                        </div> */}
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Họ tên</label>
                                <input className="form-control"
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                ></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Số điện thoại</label>
                                <input className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                ></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Địa chỉ email</label>
                                <input className="form-control"
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                ></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Địa chỉ liên hệ </label>
                                <input className="form-control"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                ></input>
                            </div>
                            <div className="col-12 form-group">
                                <label>Lý do khám</label>
                                <input className="form-control"
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                ></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Ngày sinh</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Giới tính</label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options = {this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm" onClick={() =>{this.handleConfirmBooking()}}>
                            Xác nhận
                        </button>
                        <button className="btn-booking-cancel" onClick={closeBookingClose}>
                            Đóng lại
                        </button>
                    </div>
                </div>
           </Modal>
        );
    }
}
const mapStateToProps = state =>{
    return{
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);