import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import {getAllClinic} from '../../../services/userService';
import { withRouter } from 'react-router';
import './MedicalFacility.scss';

class MedicalFacility extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataClinics: []
        }
    }
    async componentDidMount(){
        let res = await getAllClinic();
        // console.log('check res: ', res)
        if(res && res.errCode === 0){
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (clinic) =>{
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }
    render() {
        let {dataClinics} = this.state;
        // console.log("check data clinic: ", dataClinics)
        return(
            <div className='share-container medicalfacility'>
                <div className='share-content'>
                    <div className='share-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    {/* thư viện slider */}
                    <div className='share-body'>
                        <Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) =>{
                                    let imageClinic = '';
                                    if(item.image){
                                        //chuyen doi ảnh sang kiểu binary
                                        imageClinic = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    return(
                                        <div className='img-customize clinic-child' key={index} onClick={() => this.handleViewDetailClinic(item)}>
                                            <div className='bg-img bg-mefa'
                                                style={{backgroundImage: `url(${imageClinic})`}}
                                            ></div>
                                            <div className='clinic-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                                
                            </Slider>
                    </div>
                    
                </div>
        </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
