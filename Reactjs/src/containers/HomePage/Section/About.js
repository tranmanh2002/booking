import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//hàm connect giúp kết nối website với redux
import { connect } from 'react-redux';


class About extends Component {

    render() {
        
        return(
            <div className='share-container section-about'>
                <div className='section-about-header'>
                    Tại sao cần phải chăm sóc sức khỏe?
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="640" height="360" src="https://www.youtube.com/embed/41HE9gwKwjY" title="Bạn đã chăm sóc sức khoẻ đúng cách chưa?" 
                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen></iframe>
                        <div className='content-left'><i>Nguồn: Youtobe</i></div>

                    </div>
                    <div className='content-right'>
                        Sức khỏe là một kho tàng vô giá của cuộc sống, và việc bảo vệ và duy trì nó là trách nhiệm của chúng ta. Thay vì chỉ chờ đợi đến khi bệnh tật xuất hiện, chúng ta có thể thực hành "Chăm sóc sức khỏe chủ động".
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
