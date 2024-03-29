import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import './OutStandingDoctor.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    
    componentDidMount(){
        this.props.loadTopDoctors();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
                
            })
        }

    }
    handleViewDetailDoctor = (doctor) =>{
        // console.log('check doctor: ', doctor)
        if(this.props.history){
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        // console.log("check arr doctor: ", arrDoctors)

        return(
            <div className='outstandingdoctor-container'>
                <div className='outstandingdoctor-content'>
                    <div className='outstandingdoctor-header'>
                        <span className='title-doctor'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-doctor'>Xem thêm</button>
                    </div>
                    {/* thư viện slider */}
                    <div className='outstandingdoctor-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((item, index) =>{
                                    let imageBase64 = '';
                                    if(item.image){
                                        //chuyen doi ảnh sang kiểu binary
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;

                                    return (
                                        <div className='img-doctor' key= {index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-doctor'
                                                        style={{backgroundImage: `url(${imageBase64})`}}
                                                    ></div>
                                                </div>
                                                <div className='doctor-specialty text-center'>
                                                    <div>{nameVi}</div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                    
                </div>
        </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
