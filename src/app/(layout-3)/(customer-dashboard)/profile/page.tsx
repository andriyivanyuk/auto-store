import Link from "next/link";
import { Fragment } from "react";
import { format } from "date-fns/format";
import { IconUserFilled } from "@tabler/icons-react";
// API FUNCTIONS
import api from "@utils/__api__/users";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import { Button } from "@component/buttons";
import Typography, { H3, H5, Small } from "@component/Typography";
import DashboardPageHeader from "@component/DashboardPageHeader";

const infoList = [
  { title: "16", subtitle: "All Orders" },
  { title: "02", subtitle: "Awaiting Payments" },
  { title: "00", subtitle: "Awaiting Shipment" },
  { title: "01", subtitle: "Awaiting Delivery" }
];

const HEADER_LINK = (
  <Link href="/profile/edit">
    <Button color="primary">Edit Profile</Button>
  </Link>
);

export default async function Profile() {
  const user = await api.getUser();

  return (
    <Fragment>
      <DashboardPageHeader
        title="My Profile"
        button={HEADER_LINK}
        Icon={<IconUserFilled size={27} />}
      />

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card
              style={{
                height: "100%",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                boxShadow: "none",
                padding: "14px 32px"
              }}
              border="1px solid"
              borderColor="gray.200">
              <Avatar src={user.avatar} size={64} borderRadius={8} />

              <Box ml="12px" flex="1 1 0">
                <FlexBox flexWrap="wrap" justifyContent="space-between" alignItems="center">
                  <div>
                    <H5 my="0px">{`${user.name.firstName} ${user.name.lastName}`}</H5>

                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.hint">
                        Balance:
                      </Typography>

                      <Typography ml="4px" fontSize="14px" color="primary.main">
                        $500
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography fontSize="14px" color="text.hint" letterSpacing="0.2em">
                    SILVER USER
                  </Typography>
                </FlexBox>
              </Box>
            </Card>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <Card
                    style={{
                      height: "100%",
                      padding: "1rem 1.25rem",
                      borderRadius: 12,
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "none"
                    }}
                    border="1px solid"
                    borderColor="gray.200">
                    <H3 color="primary.main" my="0px" fontWeight="600">
                      {item.title}
                    </H3>

                    <Small color="text.muted" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow
        p="0.75rem 1.5rem"
        borderRadius={12}
        boxShadow="none"
        border="1px solid"
        borderColor="gray.200">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            First Name
          </Small>

          <span>{user.name.firstName}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Last Name
          </Small>

          <span>{user.name.lastName}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Email
          </Small>

          <span>{user.email}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Phone
          </Small>

          <span>{user.phone}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Birth date
          </Small>

          <span className="pre">{format(new Date(user.dateOfBirth), "dd MMM, yyyy")}</span>
        </FlexBox>
      </TableRow>
    </Fragment>
  );
}
