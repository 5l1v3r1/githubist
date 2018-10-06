// @flow

import React, { Fragment } from 'react';
import { withRouter, Switch, Route, type Match } from 'react-router-dom';
import Helmet from 'react-helmet';

import {
  Container,
  ErrorState,
  Loading,
  PageHeading,
  LinkBar,
  LinkBarItem,
} from '../../components';

import LanguageQuery from './LanguageQuery';
import query from './Language.graphql';

import GeneralInfo from './tabs/GeneralInfo';
import Repositories from './tabs/Repositories';
import Developers from './tabs/Developers';
import Locations from './tabs/Locations';

import styles from './Language.scss';

type Props = {
  match: Match,
};

const Language = ({ match }: Props) => (
  <LanguageQuery query={query} variables={{ slug: match.params.slug || '' }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <Loading />;
      }

      if (error || !data || !data.language) {
        return <ErrorState />;
      }

      return (
        <Fragment>
          <Helmet>
            <title>{data.language.name}</title>
          </Helmet>
          <Container>
            <PageHeading
              title={data.language.name}
              subtitle={`Bu dil için toplam ${data.language.totalDevelopers.toLocaleString()} geliştrici ve ${data.language.totalRepositories.toLocaleString()} repo bulunuyor.`}
            />

            <LinkBar className={styles.linkBar}>
              <LinkBarItem exact to={`/language/${data.language.slug}`}>
                Genel Bilgiler
              </LinkBarItem>
              <LinkBarItem exact to={`/language/${data.language.slug}/repositories`}>
                Meşhur Repolar
              </LinkBarItem>
              <LinkBarItem exact to={`/language/${data.language.slug}/developers`}>
                Geliştirici Kullanımı
              </LinkBarItem>
              <LinkBarItem exact to={`/language/${data.language.slug}/locations`}>
                Şehir Dağılımı
              </LinkBarItem>
            </LinkBar>

            <Switch>
              <Route exact path="/language/:slug" component={GeneralInfo} />
              <Route exact path="/language/:slug/repositories" component={Repositories} />
              <Route exact path="/language/:slug/developers" component={Developers} />
              <Route exact path="/language/:slug/locations" component={Locations} />
            </Switch>
          </Container>
        </Fragment>
      );
    }}
  </LanguageQuery>
);

export default withRouter(Language);