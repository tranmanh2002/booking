import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {getAllSpecialty} from '../../../services/userService';
import './Specialty.scss';
import Slider from 'react-slick';
import { withRouter } from 'react-router';


class Specialty extends Component {
    constructor(props){
        super(props);
        this.state ={
            dataSpecialty: []
        }
    }
    async componentDidMount(){
        let res = await getAllSpecialty();
        console.log('check res: ', res)
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    handleViewDetailSpecialty = (item) =>{
        if(this.props.history){
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    render() {
        let {dataSpecialty} = this.state;
        console.log("check data specialty: ", dataSpecialty)
        return(
            <div className='share-container specialty'>
                <div className='share-content'>
                <div className='share-header'>
                    <span className='title-section'>Chuyên khoa phổ biến</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                {/* thư viện slider */}
                <div className='share-body'>
                    <Slider {...this.props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0
                            && dataSpecialty.map((item, index) =>{
                                let imageBase64 = '';
                                    if(item.image){
                                        //chuyen doi ảnh sang kiểu binary
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                return(
                                    <div className='img-customize specialty-child' key={index}
                                    onClick={() => this.handleViewDetailSpecialty(item)}>
                                        <div className='bg-img bg-specialty'
                                            style={{ backgroundImage: `url(${imageBase64})`}}
                                        ></div>
                                        <div className='specialty-name'>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
