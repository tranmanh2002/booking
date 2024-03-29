import React, {Component} from "react";
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {getAllDetailSpecialtyByID, getAllCodeService} from '../../../services/userService';
import _ from "lodash"; 

class DetailSpecialty extends Component{

    constructor(props){
        super(props);
        this.state = {
            arrDoctorID: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;

            let res = await getAllDetailSpecialtyByID({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllCodeService('PROVINCE');

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
                let data = res.data;
                let arrDoctorID = [];
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorID.push(item.doctorID)
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if(dataProvince && dataProvince.length > 0){
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueVi: 'Toàn quốc'
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorID: arrDoctorID,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
       
    }
   handleOnChangeSelect = async (event) =>{
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getAllDetailSpecialtyByID({
                id: id,
                location: location
            })
            if(res && res.errCode === 0){
                let data = res.data;
                let arrDoctorID = [];

                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.map(item =>{
                            arrDoctorID.push(item.doctorID)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorID: arrDoctorID,
                })
            }
        }
   }
    render(){
        let {arrDoctorID, dataDetailSpecialty, listProvince} = this.state;
        // console.log("check arrDoctor: ", arrDoctorID)
        return (
           <div className="detail-specialty-container">
                <HomeHeader/>
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {
                            dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            && 
                            <div className="specialty-name" dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML}}>
                            </div>
                        }
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) =>{
                                    return(
                                        <option key = {index} value={item.keyMap}>
                                            {item.valueVi}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrDoctorID && arrDoctorID.length > 0
                    && arrDoctorID.map((item, index) =>{
                        return(
                            <div className="each-doctor" key={index}>
                                <div className="dt-content-left">
                                    <div className="profile-doctor">
                                        <ProfileDoctor
                                            doctorID = {item}
                                            isShowDescriptionDoctor = {true}
                                            isShowLinkDetail ={true}
                                            isShowPrice = {true}
                                            
                                        />
                                    </div>
                                </div>
                                <div className="dt-content-right">
                                    <div className="doctor-schedule">
                                        <DoctorSchedule
                                            doctorIDFromParent = {item}
                                        />
                                    </div>
                                    <div className="doctor-extra-infor">
                                        <DoctorExtraInfor
                                            doctorIDFromParent = {item}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);