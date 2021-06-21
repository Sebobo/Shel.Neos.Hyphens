import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {$get} from 'plow-js';
import {Button} from '@neos-project/react-ui-components';
import {neos} from '@neos-project/neos-ui-decorators';
import buttonTheme from './hyphensButtonTheme.css';
import {themr} from '@friendsofreactjs/react-css-themr';

const BUTTON_PROPS = ['formattingRule', 'inlineEditorOptions', 'i18nRegistry', 'tooltip', 'isActive', 'label'];

@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
@themr('HyphensButton', buttonTheme)
class HyphenButtonComponent extends PureComponent {
    static propTypes = {
        i18nRegistry: PropTypes.object,
        tooltip: PropTypes.string
    };

    render() {
        const finalProps = Object.keys(this.props).reduce((carry, key) => {
            if (BUTTON_PROPS.indexOf(key) === -1) carry[key] = this.props[key];
            return carry;
        }, {});
        return (
            <Button {...finalProps} isActive={Boolean(this.props.isActive)} className={buttonTheme['btn--no-padding']}
                    title={this.props.i18nRegistry.translate(this.props.tooltip)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18.109" height="9.697" viewBox="0, 0, 18.109, 9.697">
                    <g stroke="currentColor" stroke-miterlimit="3.864" fill="none">
                        <path d="M2.596 1a5.44 5.44 0 0 0 0 7.697m12.918 0a5.44 5.44 0 0 0 0-7.697" stroke-width=".907"/>
                        <path d="M4.52 4.848h9.07" stroke-width="1.814"/>
                    </g>
                </svg>
            </Button>
        );
    }
}


@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
@themr('NbspButton', buttonTheme)
class NbspButtonComponent extends PureComponent {
    static propTypes = {
        i18nRegistry: PropTypes.object,
        tooltip: PropTypes.string
    };

    render() {
        const finalProps = Object.keys(this.props).reduce((carry, key) => {
            if (BUTTON_PROPS.indexOf(key) === -1) carry[key] = this.props[key];
            return carry;
        }, {});
        return (
            <Button {...finalProps} isActive={Boolean(this.props.isActive)} className={buttonTheme['btn--no-padding']}
                title={this.props.i18nRegistry.translate(this.props.tooltip)}>
                <svg width="18px" height="9px" viewBox="0 0 18 9" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                        <path d="M16.3846154,2.61538462 L16.3846154,7.53846154 M16.3846154,7.53846154 L1.61538462,7.53846154 M1.61538462,2.61538462 L1.61538462,7.53846154" id="Combined-Shape" stroke="#FFFFFF" stroke-width="1.8"></path>
                    </g>
                </svg>
            </Button>
        );
    }
}

//
// Modify richtext editing toolbar registry
//
export default ckEditorRegistry => {
    const richtextToolbar = ckEditorRegistry.get('richtextToolbar');

    richtextToolbar.set('shy', {
        label: 'Shy',
        commandName: 'insertShyEntity',
        component: HyphenButtonComponent,
        callbackPropName: 'onClick',
        style: 'transparent',
        hoverStyle: 'brand',
        tooltip: 'Shel.Neos.Hyphens:Main:ckeditor__toolbar__shy',
        isVisible: $get('hyphens'),
        isActive: $get('shy')
    });

    richtextToolbar.set('nbsp', {
        label: 'Nbsp',
        commandName: 'insertNbspEntity',
        component: NbspButtonComponent,
        callbackPropName: 'onClick',
        style: 'transparent',
        hoverStyle: 'brand',
        tooltip: 'Shel.Neos.Hyphens:Main:ckeditor__toolbar__nbsp',
        isVisible: $get('nbsp'),
        isActive: $get('nbsp'),
    });

    return richtextToolbar;
};
