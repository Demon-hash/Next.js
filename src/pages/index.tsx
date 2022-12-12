import React from "react";
import {GetServerSideProps} from "next";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import AppConfig from "../../app.config";

import Grid from '@mui/material/Grid';

import { Page } from "../components";
import { styled } from '@mui/material/styles';
import {Paper} from "@mui/material";

const Container = styled(Paper)(({ theme }) => ({
    width: '90%',
    margin: theme.spacing(0, 'auto'),
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#832323',
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

type Props = {}

const IndexPage: React.FC<Props> = () => {
    const {t} = useTranslation("common");
    return (
        <Page>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item>xs=8</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>xs=4</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>xs=4</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>xs=8</Item>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export const getServerSideProps: GetServerSideProps = async({locale = AppConfig.defaultAppLanguage}) =>  {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'cart', 'common', 'header', 'footer'
            ])),
        },
    }
}

export default IndexPage;