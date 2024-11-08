import tw from "twin.macro";

import { useSDK } from "../../../../../../contexts/sdk";
import { EmptyStateConnectWallet } from "../../../../../common/EmptyState";
import { Card } from "../../../../../common/governance/Card";
import { GovernancePage } from "../../../../../common/governance/GovernancePage";
import { ProposalCreateInner } from "./ProposalCreateInner";

export const ProposalCreateView: React.FC = () => {
  const { sdkMut } = useSDK();
  return (
    <GovernancePage
      title="Create a Proposal"
      containerStyles={tw`w-11/12 md:w-full max-w-7xl mx-auto`}
    >
      {sdkMut ? (
        <ProposalCreateInner />
      ) : (
        <Card title="Proposal Info">
          <EmptyStateConnectWallet />
        </Card>
      )}
    </GovernancePage>
  );
};
