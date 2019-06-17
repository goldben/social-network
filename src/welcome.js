import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";

export function Welcome() {
    return (
        <div className="welcome-wrapper">
            <HashRouter>
                <div>
                    <Login />
                    <Registration />
                </div>
            </HashRouter>
            <div>
                <div className="languages">
                    English (UK) Deutsch Türkçe Polski Italiano Română Français
                    (France) Русский العربية Español Português (Brasil) Sign
                    UpLog InMessengerFacebook Lite Watch PeopleProfilesPagesPage
                    categoriesEventsPlacesGamesLocationsMarketplaceGroupsInstagramLocalFundraisersServicesAboutCreate
                    adCreate PageDevelopersCareersPrivacyCookiesAdChoices
                    Impressum/Terms/NetzDGAccount securityLogin helpHelp
                    Settings Activity log Facebook © 2019
                </div>
            </div>
        </div>
    );
}
