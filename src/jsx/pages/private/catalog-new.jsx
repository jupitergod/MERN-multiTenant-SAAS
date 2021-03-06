import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanyService from '../../services/company-service';
import CatalogEditForm from '../../components/catalog-edit-form';

class CatalogNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      company: { name: '', subdomain: '' }
    };

    this.submit = this.submit.bind(this);
  }

  submit(evt) {
    evt.preventDefault();

    CompanyService.newCompany(this.state.company, (err, data) => {
      if (err || (data && !data.success)) {
        this.setState({ errors: data && data.errors ? data.errors : [err.message] });
      } else if (data && data.success) {
        this.props.history.push('/siteadmin/companies');
      }
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-5 col-md-5 col-lg-5 form-header">
            <h4>Add Product</h4>
          </div>
        </div>
        <div className="row">
          <CatalogEditForm
            role={this.props.role}
            company={this.state.company}
            submit={this.submit}
            errors={this.state.errors}
            history={this.props.history}
            isFetching={false} />
        </div>
      </div>
    );
  }
}
CatalogNew.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default CatalogNew;
