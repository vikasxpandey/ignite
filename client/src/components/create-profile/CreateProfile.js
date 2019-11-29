import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        console.log('submit');
    }

    onChange(e) {
        e.setState({[e.target.name]: e.target.value});
    }
    
    render() {

        const { errors } = this.state;

        const options = [
            { label: '*Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student', value: 'Student' },
            { label: 'Instructor', value: 'Instructor' },
            { label: 'Other', value: 'Other' }
        ];
        
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand out.</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                placeholder="* Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                errors={errors.handle}
                                info="A unique Handle for your Profile URL"
                                />
                                <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                errors={errors.status}
                                options={options}
                                info="Give us an idea of where you are at in Your Career"
                                />
                                <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                errors={errors.company}
                                info="Could be Your own company or One you work for"
                                />
                                <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                errors={errors.website}
                                info="Could be Your or Your company's website"
                                />
                                <TextFieldGroup
                                placeholder="Location"
                                name="handle"
                                value={this.state.location}
                                onChange={this.onChange}
                                errors={errors.location}
                                info="City or City, State"
                                />
                                <TextFieldGroup
                                placeholder="Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                errors={errors.skills}
                                info="Use comma separated view (eg. HTML, CSS, JS)"
                                />
                                <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                errors={errors.githubusername}
                                info="If you want your Repos and a Github Link"
                                />
                                <TextAreaFieldGroup
                                placeholder="Bio"
                                name="bio"
                                value={this.state.handle}
                                onChange={this.onChange}
                                errors={errors.handle}
                                info="Tell us a little about Yourself"
                                />
                                <div className="mb-3">
                                    <button onClick={() => this.setState(prevState => ({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }))} className="btn btn-light">
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile);