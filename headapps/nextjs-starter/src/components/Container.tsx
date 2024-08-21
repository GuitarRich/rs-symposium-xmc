import React from 'react';
import {
    ComponentParams,
    ComponentRendering,
    Placeholder,
    useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

const BACKGROUND_REG_EXP = new RegExp(
    /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
    rendering: ComponentRendering & { params: ComponentParams };
    params: ComponentParams;
}

const DefaultContainer = (props: ComponentProps): JSX.Element => {
    const { sitecoreContext } = useSitecoreContext();
    const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
    const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
    const phKey = `container-${props.params.DynamicPlaceholderId}`;
    const id = props.params.RenderingIdentifier;
    const mediaUrlPattern = new RegExp(/mediaurl=\"([^"]*)\"/, 'i');
    let backgroundImage = props.params.BackgroundImage as string;
    let backgroundStyle: { [key: string]: string } = {};

    if (backgroundImage && backgroundImage.match(mediaUrlPattern)) {
        const mediaUrl = backgroundImage.match(mediaUrlPattern)?.[1] || '';

        backgroundStyle = {
            backgroundImage: `url('${mediaUrl}')`,
        };
    }

    return (
        <div className={`component container-default ${styles}`} id={id ? id : undefined}>
            <div className="component-content" style={backgroundStyle}>
                <div className="row">
                    <Placeholder name={phKey} rendering={props.rendering} />
                </div>
            </div>
        </div>
    );
};

export const Default = (props: ComponentProps): JSX.Element => {
    const splitStyles = props.params?.Styles?.split(' ');

    if (splitStyles && splitStyles.includes('container')) {
        return (
            <div className="container-wrapper">
                <DefaultContainer {...props} />
            </div>
        );
    }

    return <DefaultContainer {...props} />;
};
