import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import {$get} from 'plow-js';
import {IconButton} from '@neos-project/react-ui-components';
import {neos} from '@neos-project/neos-ui-decorators';

@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
class ButtonComponent extends PureComponent {
    static propTypes = {
        i18nRegistry: PropTypes.object,
        tooltip: PropTypes.string
    };
    render() {
        const finalProps = omit(this.props, ['formattingRule', 'inlineEditorOptions', 'i18nRegistry', 'tooltip', 'isActive', 'label']);
        return (<IconButton {...finalProps} isActive={Boolean(this.props.isActive)} title={this.props.i18nRegistry.translate(this.props.tooltip)}>{this.props.label}</IconButton>);
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
        icon: 'minus',
        hoverStyle: 'brand',
        tooltip: 'Shel.Neos.Hyphens:Main:ckeditor__toolbar__shy',
        isVisible: $get('hyphens'),
        isActive: $get('shy')
    });

    return richtextToolbar;
};
