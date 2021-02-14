import React, { ChangeEvent, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const useStyles = makeStyles( (theme) => ({
	root: {
		color: theme.palette.primary.main
	},
	container: {
		margin: "10px auto 0 auto",
		maxWidth: "600px",
		minWidth: "300px",
		width: "80%"
	}
}))

const region = 'ap-northeast-1';
const client = new SecretsManagerClient({ region: region });


export const SecretListContainer: React.FC = () => {
	const classes = useStyles();

	const [secretsName, setSecretsName] = useState<string>('');
	const onChangeSecretsName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSecretsName(e.currentTarget.value);
	}, [''])

	const [secrets, setSecrets] = useState<string>('');

	const onClickSecretsNameButton = useCallback(() => {
		const command = new GetSecretValueCommand({
			SecretId: secretsName
		})
		client.send(command)
		.then(
			(data) => {
				setSecrets(data.SecretString || '')
			},
			(error) => {
				console.log(error)
			})
	}, [''])

	return (
		<div className={classes.container}>
			<TextField
				type="search"
				label="secrets name"
				variant="outlined"
				onChange={onChangeSecretsName}
				/>
			{secretsName}
			<Button aria-label="find secrets" onClick={onClickSecretsNameButton}>
				button
			</Button>
			{secrets}
			{'hello'}
		</div>
	)
}
