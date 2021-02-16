import React, { ChangeEvent, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Container, Grid } from '@material-ui/core';
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { ISecretsResponse, ISecretData } from '../states';
import { SecretCard } from './secretsModules/SecretCard';

const useStyles = makeStyles( (theme) => ({
	root: {
		color: theme.palette.primary.main
	},
	container: {
		margin: "10px auto 0 auto",
		maxWidth: "600px",
		minWidth: "300px",
		width: "80%"
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
}))

const region = 'ap-northeast-1';
const client = new SecretsManagerClient({ region: region, credentials: window.core.credentialProvider() });

const dummySecret: ISecretData[] = [
	{name: "hello1", primaryId: "fea1", passphrase: "fff1"},
	{name: "hello2", primaryId: "fea2", passphrase: "fff2"},
	{name: "hello3", primaryId: "fea3", passphrase: "fff3"},
]

const createSecretCard = (data: ISecretData[]): JSX.Element[] => {
	return data.map((item, i) => {
		return <SecretCard key={i} name={item.name} primaryId={item.primaryId} passphrase={item.passphrase} />
	})
}


export const SecretListContainer: React.FC = () => {
	const classes = useStyles();

	const [secretsName, setSecretsName] = useState<string>('');
	const onChangeSecretsName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSecretsName(e.currentTarget.value);
	}, [])

	const [secrets, setSecrets] = useState<ISecretsResponse>({"status": "invalid", "data": dummySecret});

	const onClickSecretsNameButton = useCallback(() => {
		const command = new GetSecretValueCommand({
			SecretId: secretsName
		})
		client.send(command)
		.then(data => {
			const secretsString = data.SecretString || '{"status": "invalid"}'
			setSecrets(JSON.parse(secretsString))
		})
		.catch(error => {
			console.log(error)
			setSecrets({"status": "invalid"})
		})
		.finally(() => {
			console.log("fetched")
		})
	}, [secretsName])

	return (
		<div className={classes.container}>
			<TextField
				type="search"
				label="secrets name"
				variant="outlined"
				onChange={onChangeSecretsName}
				/>
			<Button aria-label="find secrets" onClick={onClickSecretsNameButton}>
				button
			</Button>
			<Container className={classes.cardGrid} maxWidth="md">
				<Grid container spacing={4}>
					{createSecretCard(secrets.data || [])}
				</Grid>
			</Container>
		</div>
	)
}
