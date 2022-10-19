import { Divider, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const ProductSkeleton = () => {
  return (
    <Grid item xs={12} md={3}>
      <Stack spacing={0.5}>
        <Skeleton variant="text" width={150} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={100} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rectangular" height={118} />
        <Skeleton variant="text" width={150} sx={{ fontSize: "2rem" }} />
        <Skeleton variant="text" width={100} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={100} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rounded" height={30} />
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          alignItems={"stretch"}
        >
          <Skeleton variant="rounded" height={15} width={"100%"} />
          <Skeleton variant="rounded" height={15} width={"100%"} />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default ProductSkeleton;
