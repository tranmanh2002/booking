import React, {Component} from "react";
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils'
import { getExtraInforDoctorByID } from "../../../services/userService";
import NumberFomat from 'react-number-format';

class DoctorExtraInfor extends Component{

    constructor(props){
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }
    async componentDidMount(){
        if(this.props.doctorIDFromParent){
            let res = await getExtraInforDoctorByID(this.props.doctorIDFromParent);
            if(res && res.errCode === 0){
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.doctorIDFromParent !== prevProps.doctorIDFromParent){
            let res = await getExtraInforDoctorByID(this.props.doctorIDFromParent);
            if(res && res.errCode === 0){
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }
    showHideDetailInfor = (status) =>{
        this.setState({
            isShowDetailInfor: status
        })
    }
    render(){
        
        let {isShowDetailInfor, extraInfor} = this.state;
        let {language} = this.props
        return (
           <div className="doctor-extra-infor-container">
                <div className="content-up"> 
                    <div className="text-address"> Địa chỉ khám</div>
                    <div className="name-clinic">
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false && 
                        <div className="short-infor">
                            GIÁ KHÁM:
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI 
                                &&
                                <NumberFomat
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType="'text"
                                    thousandSeparator= {true}
                                    suffix="VND"
                                ></NumberFomat>
                            }
                            <span className="detail" onClick={() => this.showHideDetailInfor(true)}> Xem chi tiết</span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className="title-price">
                                GIÁ KHÁM: 
                            </div>
                            <div className="detail-infor"> 
                                <div className="price">
                                    <span className="left">Giá khám:</span>
                                    <span className="right">
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI 
                                            &&
                                            <NumberFomat
                                                className="currency"
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType="'text"
                                                thousandSeparator= {true}
                                                suffix="VND"
                                            ></NumberFomat>
                                        }
                                    </span>
                                </div>
                                <div className="note">
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className="payment">
                                Người bệnh có thể thanh toán chi phí theo 

                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI 
                                    ? extraInfor.paymentTypeData.valueVi : ''
                                }
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfor(false)}> Ẩn bảng giá</span>
                            </div>
                        </>
                    } 
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);