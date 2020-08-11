import React from 'react';
import { Container, Grid,  Card, CardContent, Typography} from '@material-ui/core';
import CountUp from 'react-countup';
import styles from "./DataCards.module.css";
import cx from "classnames";

// destructure the data state being passed in
function DataCards({data: {positive, recovered, death} }) {
    // if the data is not yet fetched and loaded into state, return a loading message
    if (!positive) {
        return "Loading state..."
    }

    return (
        <div>
            <Container>
                <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={3}>
                    <Grid item xs={12} md={4} sm>
                        <Card className={cx(styles.infected)}>
                            <CardContent>
                                <Typography variant="h4">Infected</Typography>
                                <Typography variant="h5"><CountUp start={0} end={positive} duration={2} separator="," /></Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} sm>
                        <Card>
                            <CardContent className={cx(styles.recovered)}>
                                <Typography variant="h4">Recovered</Typography>
                                <Typography variant="h5"><CountUp start={0} end={recovered} duration={2} separator="," /></Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} sm>
                        <Card className={cx(styles.deaths)}>
                            <CardContent>
                                <Typography variant="h4">Deaths</Typography>
                                <Typography variant="h5"><CountUp start={0} end={death} duration={2} separator="," /></Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default DataCards
