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


interface SecretsResponse {
	status: "invalid" | "valid"
	data?: SecretsData[]
}

interface SecretsData {
	name: string
	values: Value[]
}

interface Value {
	key: string
	value: string
}

export const SecretListContainer: React.FC = () => {
	const classes = useStyles();

	const [secretsName, setSecretsName] = useState<string>('');
	const onChangeSecretsName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSecretsName(e.currentTarget.value);
	}, [])

	const [secrets, setSecrets] = useState<SecretsResponse>({"status": "invalid", "data": []});

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
		</div>
	)
}
