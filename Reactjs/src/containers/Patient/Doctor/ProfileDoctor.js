import React, {Component} from "react";
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { getProfileDoctorByID } from "../../../services/userService";
import {LANGUAGES} from '../../../utils'
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component{

    constructor(props){
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount(){
        let data = await this.getInforDoctor(this.props.doctorID);
        this.setState({
            dataProfile: data
        })
    }
    getInforDoctor = async (id) =>{
        let result = {};
        if(id) {
            let res = await getProfileDoctorByID(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
       if (this.props.doctorID !== prevProps.doctorID){

       }
    }
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    //Lấy thời gian đặt lich
    renderTimeBooking = (dataTime) =>{
        let {language} = this.props;

        // console.log('check data time: ', dataTime)
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : '';
            //chuyển đổi từ chuỗi string sang date, unix lấy theo mini giây
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') : ''

            return(
                <>
                    <div>{time} / {this.capitalizeFirstLetter(date)}</div>
                    <div>Miễn đặt lịch</div>
                </>
            )
        }
        return <></>
       
    }
    render(){

        let {dataProfile} = this.state;
        let {language, isShowDescriptionDoctor, dataTime,
            isShowPrice, isShowLinkDetail, doctorID} = this.props;
        let nameVi = '';
        // console.log('check dataprofile: ', dataProfile)
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        }
        // console.log("check datatime: ", dataTime)
        return (
           <div className="profile-doctor-container">
                <div className="intro-doctor">
                     <div
                        className="content-left"
                        style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : '' }) `}}>
                    </div>
                    <div className="content-right">
                        <div className="up">
                            {nameVi}
                        </div>
                        <div className="down">
                        {isShowDescriptionDoctor === true ?
                            <>
                                {dataProfile && dataProfile.Markdown
                                    && dataProfile.Markdown.description
                                    &&
                                    <span>{dataProfile.Markdown.description}</span>
                                }
                            </>
                            : 
                            <>
                                {this.renderTimeBooking(dataTime)}
                            </>
                        }
                        </div>
                    </div>
                </div>
                {isShowPrice === true && 
                    <div className="price">
                    Giá khám:  
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                            displayType={"text"}
                            thousandSeparator = {true}
                            suffix={'VND'}
                        />
                    }
                </div>
                }
                {isShowLinkDetail === true && 
                    <div className="view-detail-doctor">
                        <Link to = {`/detail-doctor/${doctorID}`}>Xem thêm</Link>
                    </div>
                }
                
                
           </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);