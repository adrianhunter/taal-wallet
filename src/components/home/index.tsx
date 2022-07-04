import { FC } from 'react';
import styled from 'styled-components';
import { Button } from '../button';
import { useAppSelector } from '@/src/hooks';
import { formatNumber } from '@/src/utils/generic';
import { navigateTo } from '@/src/utils/navigation';
import { routes } from '@/src/constants/routes';
import { IconButton } from '../generic/icon-button';
import { RefreshIcon } from '../svg/refreshIcon';
import { Arrow } from '../svg/arrow';
import { BsvIcon } from '../svg/bsvIcon';
import { HistoryIcon } from '../svg/historyIcon';
import { QuickWalletSelector } from '../quickWalletSelector';
import { Heading } from '../generic/heading';
import { useBlockchain } from '@/src/hooks/useBlockchain';
import { Tooltip } from '../generic/tooltip';

type Props = {
  className?: string;
};

type TokenType = {
  balance: number;
  symbol: string;
};

export const Home: FC<Props> = ({ className }) => {
  const { activePk } = useAppSelector(state => state.pk);
  const { getBalance, airdrop } = useBlockchain();

  return (
    <Wrapper className={className}>
      <QuickWalletSelector />

      <HeadingStyled
        icon={<BsvIcon />}
        cta={
          <Tooltip contents="Refresh balance">
            <IconButton onClick={getBalance} data-tip="Refetch balance">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        }
      >
        Balance{' '}
        {typeof activePk?.balance?.amount === 'number'
          ? `${formatNumber(activePk?.balance?.amount)}${'\u00A0'}satoshis`
          : 'unknown'}
      </HeadingStyled>

      <ButtonWrapper>
        <Button variant="accent" onClick={() => navigateTo(routes.SEND_BSV)}>
          <Arrow direction="upright" />
          Send BSV
        </Button>
        <Button variant="success" onClick={() => navigateTo(routes.RECEIVE_BSV)}>
          <Arrow direction="downleft" />
          Receive BSV
        </Button>
        <Button onClick={() => navigateTo(routes.HISTORY)}>
          <HistoryIcon />
          History
        </Button>
        <Button onClick={() => navigateTo(routes.TOKENS)}>
          <HistoryIcon />
          Tokens
        </Button>
        <Button onClick={() => navigateTo(routes.ONBOARDING_NEW)}>Add account</Button>
        <Button onClick={() => navigateTo(routes.ONBOARDING_IMPORT)}>Import account</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  //
`;

const HeadingStyled = styled(Heading)`
  margin: 2rem 0;

  h1 {
    font-size: 1.4rem;
    flex-shrink: 0;
    flex-grow: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  flex-direction: column;
  gap: 0.5rem;
`;
