import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import {$get} from 'plow-js';
import {Button} from '@neos-project/react-ui-components';
import {neos} from '@neos-project/neos-ui-decorators';
import hyphensButtonTheme from './hyphensButtonTheme.css';
import {themr} from '@friendsofreactjs/react-css-themr';

@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
@themr('HyphensButton', hyphensButtonTheme)
class ButtonComponent extends PureComponent {
    static propTypes = {
        i18nRegistry: PropTypes.object,
        tooltip: PropTypes.string
    };

    render() {
        const finalProps = omit(this.props, ['formattingRule', 'inlineEditorOptions', 'i18nRegistry', 'tooltip', 'isActive', 'label']);
        return (
            <Button {...finalProps} isActive={Boolean(this.props.isActive)} className={hyphensButtonTheme['btn--no-padding']}
                    title={this.props.i18nRegistry.translate(this.props.tooltip)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18.109" height="9.697" viewBox="0, 0, 18.109, 9.697">
                    <g stroke="currentColor" stroke-miterlimit="3.864" fill="none">
                        <path d="M2.596 1a5.44 5.44 0 0 0 0 7.697m12.918 0a5.44 5.44 0 0 0 0-7.697"
                              stroke-width=".907"/>
                        <path d="M4.52 4.848h9.07" stroke-width="1.814"/>
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
        component: ButtonComponent,
        callbackPropName: 'onClick',
        style: 'transparent',
        hoverStyle: 'brand',
        tooltip: 'Shel.Neos.Hyphens:Main:ckeditor__toolbar__shy',
        isVisible: $get('hyphens'),
        isActive: $get('shy')
    });

    return richtextToolbar;
};
