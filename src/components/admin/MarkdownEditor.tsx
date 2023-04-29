import React from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';

import styled from 'styled-components';

import 'react-mde/lib/styles/css/react-mde-all.css';

const EditorContainer = styled.div<any>`
    width: ${(props) => props.width || '100%'};
    margin: ${(props) => props.margin || 0};
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    .react-mde {
        width: 100%;
    }

    .mde-textarea-wrapper {
        textarea {
            height: ${(props) => props.height || '300px !important'};
        }
    }
`;

interface MarkdownEditorProps {
    keyValue: string;
    height?: string;
    margin?: string;
    value: string | undefined;
    onChange: (value: string) => void;
}

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
});

const MarkdownEditor = (props: MarkdownEditorProps) => {
    const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>('write');

    return (
        <EditorContainer margin={props.margin} key={props.keyValue} height={props.height}>
            <ReactMde
                value={props.value}
                onChange={(value) => {
                    props.onChange(value || '');
                }}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
            />
        </EditorContainer>
    );
};

export default MarkdownEditor;
