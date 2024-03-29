import React, {Component} from "react";
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from "../../../services/userService";
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from "./DoctorExtraInfor";

class DetailDoctor extends Component{

    constructor(props){
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorID: -1,
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            // console.log("check params id: ", id)
            this.setState({
                currentDoctorID: id
            })
            let res = await getDetailInforDoctor(id);
            if(res && res.errCode === 0){
                // console.log('check data: ', res.data)
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){

    }
    render(){
        let {detailDoctor} = this.state;
         let nameVi = ''
        // console.log('check detail: ', detailDoctor)
        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        
        // console.log('check detail doctor: ', nameVi)
        return (
            <>
                <HomeHeader
                    isShowBanner = {false}
                ></HomeHeader>
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div
                            className="content-left"
                            style={{backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : '' }) `}}>
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {nameVi}
                            </div>
                            <div className="down">
                                {detailDoctor && detailDoctor.Markdown 
                                    && detailDoctor.Markdown.description
                                    &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule
                                doctorIDFromParent = {this.state.currentDoctorID}
                            ></DoctorSchedule>
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfor 
                                doctorIDFromParent= {this.state.currentDoctorID}
                            ></DoctorExtraInfor>
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}>

                            </div>
                        }
                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>
            </>
           
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);