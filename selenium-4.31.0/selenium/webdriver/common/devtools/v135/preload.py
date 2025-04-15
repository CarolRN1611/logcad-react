# DO NOT EDIT THIS FILE!
#
# This file is generated from the CDP specification. If you need to make
# changes, edit the generator and regenerate all of the modules.
#
# CDP domain: Preload (experimental)
from __future__ import annotations
from .util import event_class, T_JSON_DICT
from dataclasses import dataclass
import enum
import typing
from . import dom
from . import network
from . import page


class RuleSetId(str):
    '''
    Unique id
    '''
    def to_json(self) -> str:
        return self

    @classmethod
    def from_json(cls, json: str) -> RuleSetId:
        return cls(json)

    def __repr__(self):
        return 'RuleSetId({})'.format(super().__repr__())


@dataclass
class RuleSet:
    '''
    Corresponds to SpeculationRuleSet
    '''
    id_: RuleSetId

    #: Identifies a document which the rule set is associated with.
    loader_id: network.LoaderId

    #: Source text of JSON representing the rule set. If it comes from
    #: ``script`` tag, it is the textContent of the node. Note that it is
    #: a JSON for valid case.
    #: 
    #: See also:
    #: - https://wicg.github.io/nav-speculation/speculation-rules.html
    #: - https://github.com/WICG/nav-speculation/blob/main/triggers.md
    source_text: str

    #: A speculation rule set is either added through an inline
    #: ``script`` tag or through an external resource via the
    #: 'Speculation-Rules' HTTP header. For the first case, we include
    #: the BackendNodeId of the relevant ``script`` tag. For the second
    #: case, we include the external URL where the rule set was loaded
    #: from, and also RequestId if Network domain is enabled.
    #: 
    #: See also:
    #: - https://wicg.github.io/nav-speculation/speculation-rules.html#speculation-rules-script
    #: - https://wicg.github.io/nav-speculation/speculation-rules.html#speculation-rules-header
    backend_node_id: typing.Optional[dom.BackendNodeId] = None

    url: typing.Optional[str] = None

    request_id: typing.Optional[network.RequestId] = None

    #: Error information
    #: ``errorMessage`` is null iff ``errorType`` is null.
    error_type: typing.Optional[RuleSetErrorType] = None

    #: TODO(https://crbug.com/1425354): Replace this property with structured error.
    error_message: typing.Optional[str] = None

    def to_json(self):
        json = dict()
        json['id'] = self.id_.to_json()
        json['loaderId'] = self.loader_id.to_json()
        json['sourceText'] = self.source_text
        if self.backend_node_id is not None:
            json['backendNodeId'] = self.backend_node_id.to_json()
        if self.url is not None:
            json['url'] = self.url
        if self.request_id is not None:
            json['requestId'] = self.request_id.to_json()
        if self.error_type is not None:
            json['errorType'] = self.error_type.to_json()
        if self.error_message is not None:
            json['errorMessage'] = self.error_message
        return json

    @classmethod
    def from_json(cls, json):
        return cls(
            id_=RuleSetId.from_json(json['id']),
            loader_id=network.LoaderId.from_json(json['loaderId']),
            source_text=str(json['sourceText']),
            backend_node_id=dom.BackendNodeId.from_json(json['backendNodeId']) if 'backendNodeId' in json else None,
            url=str(json['url']) if 'url' in json else None,
            request_id=network.RequestId.from_json(json['requestId']) if 'requestId' in json else None,
            error_type=RuleSetErrorType.from_json(json['errorType']) if 'errorType' in json else None,
            error_message=str(json['errorMessage']) if 'errorMessage' in json else None,
        )


class RuleSetErrorType(enum.Enum):
    SOURCE_IS_NOT_JSON_OBJECT = "SourceIsNotJsonObject"
    INVALID_RULES_SKIPPED = "InvalidRulesSkipped"

    def to_json(self):
        return self.value

    @classmethod
    def from_json(cls, json):
        return cls(json)


class SpeculationAction(enum.Enum):
    '''
    The type of preloading attempted. It corresponds to
    mojom::SpeculationAction (although PrefetchWithSubresources is omitted as it
    isn't being used by clients).
    '''
    PREFETCH = "Prefetch"
    PRERENDER = "Prerender"

    def to_json(self):
        return self.value

    @classmethod
    def from_json(cls, json):
        return cls(json)


class SpeculationTargetHint(enum.Enum):
    '''
    Corresponds to mojom::SpeculationTargetHint.
    See https://github.com/WICG/nav-speculation/blob/main/triggers.md#window-name-targeting-hints
    '''
    BLANK = "Blank"
    SELF = "Self"

    def to_json(self):
        return self.value

    @classmethod
    def from_json(cls, json):
        return cls(json)


@dataclass
class PreloadingAttemptKey:
    '''
    A key that identifies a preloading attempt.

    The url used is the url specified by the trigger (i.e. the initial URL), and
    not the final url that is navigated to. For example, prerendering allows
    same-origin main frame navigations during the attempt, but the attempt is
    still keyed with the initial URL.
    '''
    loader_id: network.LoaderId

    action: SpeculationAction

    url: str

    target_hint: typing.Optional[SpeculationTargetHint] = None

    def to_json(self):
        json = dict()
        json['loaderId'] = self.loader_id.to_json()
        json['action'] = self.action.to_json()
        json['url'] = self.url
        if self.target_hint is not None:
            json['targetHint'] = self.target_hint.to_json()
        return json

    @classmethod
    def from_json(cls, json):
        return cls(
            loader_id=network.LoaderId.from_json(json['loaderId']),
            action=SpeculationAction.from_json(json['action']),
            url=str(json['url']),
            target_hint=SpeculationTargetHint.from_json(json['targetHint']) if 'targetHint' in json else None,
        )


@dataclass
class PreloadingAttemptSource:
    '''
    Lists sources for a preloading attempt, specifically the ids of rule sets
    that had a speculation rule that triggered the attempt, and the
    BackendNodeIds of <a href> or <area href> elements that triggered the
    attempt (in the case of attempts triggered by a document rule). It is
    possible for multiple rule sets and links to trigger a single attempt.
    '''
    key: PreloadingAttemptKey

    rule_set_ids: typing.List[RuleSetId]

    node_ids: typing.List[dom.BackendNodeId]

    def to_json(self):
        json = dict()
        json['key'] = self.key.to_json()
        json['ruleSetIds'] = [i.to_json() for i in self.rule_set_ids]
        json['nodeIds'] = [i.to_json() for i in self.node_ids]
        return json

    @classmethod
    def from_json(cls, json):
        return cls(
            key=PreloadingAttemptKey.from_json(json['key']),
            rule_set_ids=[RuleSetId.from_json(i) for i in json['ruleSetIds']],
            node_ids=[dom.BackendNodeId.from_json(i) for i in json['nodeIds']],
        )


class PreloadPipelineId(str):
    '''
    Chrome manages different types of preloads together using a
    concept of preloading pipeline. For example, if a site uses a
    SpeculationRules for prerender, Chrome first starts a prefetch and
    then upgrades it to prerender.

    CDP events for them are emitted separately but they share
    ``PreloadPipelineId``.
    '''
    def to_json(self) -> str:
        return self

    @classmethod
    def from_json(cls, json: str) -> PreloadPipelineId:
        return cls(json)

    def __repr__(self):
        return 'PreloadPipelineId({})'.format(super().__repr__())


class PrerenderFinalStatus(enum.Enum):
    '''
    List of FinalStatus reasons for Prerender2.
    '''
    ACTIVATED = "Activated"
    DESTROYED = "Destroyed"
    LOW_END_DEVICE = "LowEndDevice"
    INVALID_SCHEME_REDIRECT = "InvalidSchemeRedirect"
    INVALID_SCHEME_NAVIGATION = "InvalidSchemeNavigation"
    NAVIGATION_REQUEST_BLOCKED_BY_CSP = "NavigationRequestBlockedByCsp"
    MAIN_FRAME_NAVIGATION = "MainFrameNavigation"
    MOJO_BINDER_POLICY = "MojoBinderPolicy"
    RENDERER_PROCESS_CRASHED = "RendererProcessCrashed"
    RENDERER_PROCESS_KILLED = "RendererProcessKilled"
    DOWNLOAD = "Download"
    TRIGGER_DESTROYED = "TriggerDestroyed"
    NAVIGATION_NOT_COMMITTED = "NavigationNotCommitted"
    NAVIGATION_BAD_HTTP_STATUS = "NavigationBadHttpStatus"
    CLIENT_CERT_REQUESTED = "ClientCertRequested"
    NAVIGATION_REQUEST_NETWORK_ERROR = "NavigationRequestNetworkError"
    CANCEL_ALL_HOSTS_FOR_TESTING = "CancelAllHostsForTesting"
    DID_FAIL_LOAD = "DidFailLoad"
    STOP = "Stop"
    SSL_CERTIFICATE_ERROR = "SslCertificateError"
    LOGIN_AUTH_REQUESTED = "LoginAuthRequested"
    UA_CHANGE_REQUIRES_RELOAD = "UaChangeRequiresReload"
    BLOCKED_BY_CLIENT = "BlockedByClient"
    AUDIO_OUTPUT_DEVICE_REQUESTED = "AudioOutputDeviceRequested"
    MIXED_CONTENT = "MixedContent"
    TRIGGER_BACKGROUNDED = "TriggerBackgrounded"
    MEMORY_LIMIT_EXCEEDED = "MemoryLimitExceeded"
    DATA_SAVER_ENABLED = "DataSaverEnabled"
    TRIGGER_URL_HAS_EFFECTIVE_URL = "TriggerUrlHasEffectiveUrl"
    ACTIVATED_BEFORE_STARTED = "ActivatedBeforeStarted"
    INACTIVE_PAGE_RESTRICTION = "InactivePageRestriction"
    START_FAILED = "StartFailed"
    TIMEOUT_BACKGROUNDED = "TimeoutBackgrounded"
    CROSS_SITE_REDIRECT_IN_INITIAL_NAVIGATION = "CrossSiteRedirectInInitialNavigation"
    CROSS_SITE_NAVIGATION_IN_INITIAL_NAVIGATION = "CrossSiteNavigationInInitialNavigation"
    SAME_SITE_CROSS_ORIGIN_REDIRECT_NOT_OPT_IN_IN_INITIAL_NAVIGATION = "SameSiteCrossOriginRedirectNotOptInInInitialNavigation"
    SAME_SITE_CROSS_ORIGIN_NAVIGATION_NOT_OPT_IN_IN_INITIAL_NAVIGATION = "SameSiteCrossOriginNavigationNotOptInInInitialNavigation"
    ACTIVATION_NAVIGATION_PARAMETER_MISMATCH = "ActivationNavigationParameterMismatch"
    ACTIVATED_IN_BACKGROUND = "ActivatedInBackground"
    EMBEDDER_HOST_DISALLOWED = "EmbedderHostDisallowed"
    ACTIVATION_NAVIGATION_DESTROYED_BEFORE_SUCCESS = "ActivationNavigationDestroyedBeforeSuccess"
    TAB_CLOSED_BY_USER_GESTURE = "TabClosedByUserGesture"
    TAB_CLOSED_WITHOUT_USER_GESTURE = "TabClosedWithoutUserGesture"
    PRIMARY_MAIN_FRAME_RENDERER_PROCESS_CRASHED = "PrimaryMainFrameRendererProcessCrashed"
    PRIMARY_MAIN_FRAME_RENDERER_PROCESS_KILLED = "PrimaryMainFrameRendererProcessKilled"
    ACTIVATION_FRAME_POLICY_NOT_COMPATIBLE = "ActivationFramePolicyNotCompatible"
    PRELOADING_DISABLED = "PreloadingDisabled"
    BATTERY_SAVER_ENABLED = "BatterySaverEnabled"
    ACTIVATED_DURING_MAIN_FRAME_NAVIGATION = "ActivatedDuringMainFrameNavigation"
    PRELOADING_UNSUPPORTED_BY_WEB_CONTENTS = "PreloadingUnsupportedByWebContents"
    CROSS_SITE_REDIRECT_IN_MAIN_FRAME_NAVIGATION = "CrossSiteRedirectInMainFrameNavigation"
    CROSS_SITE_NAVIGATION_IN_MAIN_FRAME_NAVIGATION = "CrossSiteNavigationInMainFrameNavigation"
    SAME_SITE_CROSS_ORIGIN_REDIRECT_NOT_OPT_IN_IN_MAIN_FRAME_NAVIGATION = "SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation"
    SAME_SITE_CROSS_ORIGIN_NAVIGATION_NOT_OPT_IN_IN_MAIN_FRAME_NAVIGATION = "SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation"
    MEMORY_PRESSURE_ON_TRIGGER = "MemoryPressureOnTrigger"
    MEMORY_PRESSURE_AFTER_TRIGGERED = "MemoryPressureAfterTriggered"
    PRERENDERING_DISABLED_BY_DEV_TOOLS = "PrerenderingDisabledByDevTools"
    SPECULATION_RULE_REMOVED = "SpeculationRuleRemoved"
    ACTIVATED_WITH_AUXILIARY_BROWSING_CONTEXTS = "ActivatedWithAuxiliaryBrowsingContexts"
    MAX_NUM_OF_RUNNING_EAGER_PRERENDERS_EXCEEDED = "MaxNumOfRunningEagerPrerendersExceeded"
    MAX_NUM_OF_RUNNING_NON_EAGER_PRERENDERS_EXCEEDED = "MaxNumOfRunningNonEagerPrerendersExceeded"
    MAX_NUM_OF_RUNNING_EMBEDDER_PRERENDERS_EXCEEDED = "MaxNumOfRunningEmbedderPrerendersExceeded"
    PRERENDERING_URL_HAS_EFFECTIVE_URL = "PrerenderingUrlHasEffectiveUrl"
    REDIRECTED_PRERENDERING_URL_HAS_EFFECTIVE_URL = "RedirectedPrerenderingUrlHasEffectiveUrl"
    ACTIVATION_URL_HAS_EFFECTIVE_URL = "ActivationUrlHasEffectiveUrl"
    JAVA_SCRIPT_INTERFACE_ADDED = "JavaScriptInterfaceAdded"
    JAVA_SCRIPT_INTERFACE_REMOVED = "JavaScriptInterfaceRemoved"
    ALL_PRERENDERING_CANCELED = "AllPrerenderingCanceled"
    WINDOW_CLOSED = "WindowClosed"
    SLOW_NETWORK = "SlowNetwork"
    OTHER_PRERENDERED_PAGE_ACTIVATED = "OtherPrerenderedPageActivated"
    V8_OPTIMIZER_DISABLED = "V8OptimizerDisabled"
    PRERENDER_FAILED_DURING_PREFETCH = "PrerenderFailedDuringPrefetch"
    BROWSING_DATA_REMOVED = "BrowsingDataRemoved"

    def to_json(self):
        return self.value

    @classmethod
    def from_json(cls, json):
        return cls(json)


class PreloadingStatus(enum.Enum):
    '''
    Preloading status values, see also PreloadingTriggeringOutcome. This
    status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
    '''
    PENDING = "Pending"
    RUNNING = "Running"
    READY = "Ready"
    SUCCESS = "Success"
    FAILURE = "Failure"
    NOT_SUPPORTED = "NotSupported"

    def to_json(self):
        return self.value

    @classmethod
    def from_json(cls, json):
        return cls(json)


class PrefetchStatus(enum.Enum):
    '''
    TODO(https://crbug.com/1384419): revisit the list of PrefetchStatus and
    filter out the ones that aren't necessary to the developers.
    '''
    PREFETCH_ALLOWED = "PrefetchAllowed"
    PREFETCH_FAILED_INELIGIBLE_REDIRECT = "PrefetchFailedIneligibleRedirect"
    PREFETCH_FAILED_INVALID_REDIRECT = "PrefetchFailedInvalidRedirect"
    PREFETCH_FAILED_MIME_NOT_SUPPORTED = "PrefetchFailedMIMENotSupported"
    PREFETCH_FAILED_NET_ERROR = "PrefetchFailedNetError"
    PREFETCH_FAILED_NON2_XX = "PrefetchFailedNon2XX"
    PREFETCH_EVICTED_AFTER_CANDIDATE_REMOVED = "PrefetchEvictedAfterCandidateRemoved"
    PREFETCH_EVICTED_FOR_NEWER_PREFETCH = "PrefetchEvictedForNewerPrefetch"
    PREFETCH_HELDBACK = "PrefetchHeldback"
    PREFETCH_INELIGIBLE_RETRY_AFTER = "PrefetchIneligibleRetryAfter"
    PREFETCH_IS_PRIVACY_DECOY = "PrefetchIsPrivacyDecoy"
    PREFETCH_IS_STALE = "PrefetchIsStale"
    PREFETCH_NOT_ELIGIBLE_BROWSER_CONTEXT_OFF_THE_RECORD = "PrefetchNotEligibleBrowserContextOffTheRecord"
    PREFETCH_NOT_ELIGIBLE_DATA_SAVER_ENABLED = "PrefetchNotEligibleDataSaverEnabled"
    PREFETCH_NOT_ELIGIBLE_EXISTING_PROXY = "PrefetchNotEligibleExistingProxy"
    PREFETCH_NOT_ELIGIBLE_HOST_IS_NON_UNIQUE = "PrefetchNotEligibleHostIsNonUnique"
    PREFETCH_NOT_ELIGIBLE_NON_DEFAULT_STORAGE_PARTITION = "PrefetchNotEligibleNonDefaultStoragePartition"
    PREFETCH_NOT_ELIGIBLE_SAME_SITE_CROSS_ORIGIN_PREFETCH_REQUIRED_PROXY = "PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy"
    PREFETCH_NOT_ELIGIBLE_SCHEME_IS_NOT_HTTPS = "PrefetchNotEligibleSchemeIsNotHttps"
    PREFETCH_NOT_ELIGIBLE_USER_HAS_COOKIES = "PrefetchNotEligibleUserHasCookies"
    PREFETCH_NOT_ELIGIBLE_USER_HAS_SERVICE_WORKER = "PrefetchNotEligibleUserHasServiceWorker"
    PREFETCH_NOT_ELIGIBLE_BATTERY_SAVER_ENABLED = "PrefetchNotEligibleBatterySaverEnabled"
    PREFETCH_NOT_ELIGIBLE_PRELOADING_DISABLED = "PrefetchNotEligiblePreloadingDisabled"
    PREFETCH_NOT_FINISHED_IN_TIME = "PrefetchNotFinishedInTime"
    PREFETCH_NOT_STARTED = "PrefetchNotStarted"
    PREFETCH_NOT_USED_COOKIES_CHANGED = "PrefetchNotUsedCookiesChanged"
    PREFETCH_PROXY_NOT_AVAILABLE = "PrefetchProxyNotAvailable"
    PREFETCH_RESPONSE_USED = "PrefetchResponseUsed"
    PREFETCH_SUCCESSFUL_BUT_NOT_USED = "PrefetchSuccessfulButNotUsed"
    PREFETCH_NOT_USED_PROBE_FAILED = "PrefetchNotUsedProbeFailed"

    def to_json(self):
        return self.value

    @classmethod
    def from_json(cls, json):
        return cls(json)


@dataclass
class PrerenderMismatchedHeaders:
    '''
    Information of headers to be displayed when the header mismatch occurred.
    '''
    header_name: str

    initial_value: typing.Optional[str] = None

    activation_value: typing.Optional[str] = None

    def to_json(self):
        json = dict()
        json['headerName'] = self.header_name
        if self.initial_value is not None:
            json['initialValue'] = self.initial_value
        if self.activation_value is not None:
            json['activationValue'] = self.activation_value
        return json

    @classmethod
    def from_json(cls, json):
        return cls(
            header_name=str(json['headerName']),
            initial_value=str(json['initialValue']) if 'initialValue' in json else None,
            activation_value=str(json['activationValue']) if 'activationValue' in json else None,
        )


def enable() -> typing.Generator[T_JSON_DICT,T_JSON_DICT,None]:

    cmd_dict: T_JSON_DICT = {
        'method': 'Preload.enable',
    }
    json = yield cmd_dict


def disable() -> typing.Generator[T_JSON_DICT,T_JSON_DICT,None]:

    cmd_dict: T_JSON_DICT = {
        'method': 'Preload.disable',
    }
    json = yield cmd_dict


@event_class('Preload.ruleSetUpdated')
@dataclass
class RuleSetUpdated:
    '''
    Upsert. Currently, it is only emitted when a rule set added.
    '''
    rule_set: RuleSet

    @classmethod
    def from_json(cls, json: T_JSON_DICT) -> RuleSetUpdated:
        return cls(
            rule_set=RuleSet.from_json(json['ruleSet'])
        )


@event_class('Preload.ruleSetRemoved')
@dataclass
class RuleSetRemoved:
    id_: RuleSetId

    @classmethod
    def from_json(cls, json: T_JSON_DICT) -> RuleSetRemoved:
        return cls(
            id_=RuleSetId.from_json(json['id'])
        )


@event_class('Preload.preloadEnabledStateUpdated')
@dataclass
class PreloadEnabledStateUpdated:
    '''
    Fired when a preload enabled state is updated.
    '''
    disabled_by_preference: bool
    disabled_by_data_saver: bool
    disabled_by_battery_saver: bool
    disabled_by_holdback_prefetch_speculation_rules: bool
    disabled_by_holdback_prerender_speculation_rules: bool

    @classmethod
    def from_json(cls, json: T_JSON_DICT) -> PreloadEnabledStateUpdated:
        return cls(
            disabled_by_preference=bool(json['disabledByPreference']),
            disabled_by_data_saver=bool(json['disabledByDataSaver']),
            disabled_by_battery_saver=bool(json['disabledByBatterySaver']),
            disabled_by_holdback_prefetch_speculation_rules=bool(json['disabledByHoldbackPrefetchSpeculationRules']),
            disabled_by_holdback_prerender_speculation_rules=bool(json['disabledByHoldbackPrerenderSpeculationRules'])
        )


@event_class('Preload.prefetchStatusUpdated')
@dataclass
class PrefetchStatusUpdated:
    '''
    Fired when a prefetch attempt is updated.
    '''
    key: PreloadingAttemptKey
    pipeline_id: PreloadPipelineId
    #: The frame id of the frame initiating prefetch.
    initiating_frame_id: page.FrameId
    prefetch_url: str
    status: PreloadingStatus
    prefetch_status: PrefetchStatus
    request_id: network.RequestId

    @classmethod
    def from_json(cls, json: T_JSON_DICT) -> PrefetchStatusUpdated:
        return cls(
            key=PreloadingAttemptKey.from_json(json['key']),
            pipeline_id=PreloadPipelineId.from_json(json['pipelineId']),
            initiating_frame_id=page.FrameId.from_json(json['initiatingFrameId']),
            prefetch_url=str(json['prefetchUrl']),
            status=PreloadingStatus.from_json(json['status']),
            prefetch_status=PrefetchStatus.from_json(json['prefetchStatus']),
            request_id=network.RequestId.from_json(json['requestId'])
        )


@event_class('Preload.prerenderStatusUpdated')
@dataclass
class PrerenderStatusUpdated:
    '''
    Fired when a prerender attempt is updated.
    '''
    key: PreloadingAttemptKey
    pipeline_id: PreloadPipelineId
    status: PreloadingStatus
    prerender_status: typing.Optional[PrerenderFinalStatus]
    #: This is used to give users more information about the name of Mojo interface
    #: that is incompatible with prerender and has caused the cancellation of the attempt.
    disallowed_mojo_interface: typing.Optional[str]
    mismatched_headers: typing.Optional[typing.List[PrerenderMismatchedHeaders]]

    @classmethod
    def from_json(cls, json: T_JSON_DICT) -> PrerenderStatusUpdated:
        return cls(
            key=PreloadingAttemptKey.from_json(json['key']),
            pipeline_id=PreloadPipelineId.from_json(json['pipelineId']),
            status=PreloadingStatus.from_json(json['status']),
            prerender_status=PrerenderFinalStatus.from_json(json['prerenderStatus']) if 'prerenderStatus' in json else None,
            disallowed_mojo_interface=str(json['disallowedMojoInterface']) if 'disallowedMojoInterface' in json else None,
            mismatched_headers=[PrerenderMismatchedHeaders.from_json(i) for i in json['mismatchedHeaders']] if 'mismatchedHeaders' in json else None
        )


@event_class('Preload.preloadingAttemptSourcesUpdated')
@dataclass
class PreloadingAttemptSourcesUpdated:
    '''
    Send a list of sources for all preloading attempts in a document.
    '''
    loader_id: network.LoaderId
    preloading_attempt_sources: typing.List[PreloadingAttemptSource]

    @classmethod
    def from_json(cls, json: T_JSON_DICT) -> PreloadingAttemptSourcesUpdated:
        return cls(
            loader_id=network.LoaderId.from_json(json['loaderId']),
            preloading_attempt_sources=[PreloadingAttemptSource.from_json(i) for i in json['preloadingAttemptSources']]
        )
