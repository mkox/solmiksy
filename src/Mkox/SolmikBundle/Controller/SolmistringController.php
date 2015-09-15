<?php

namespace Mkox\SolmikBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Mkox\SolmikBundle\Form;
use Mkox\SolmikBundle\Entity;

class SolmistringController extends Controller {

    /**
     *
     * @var type Doctrine\ORM\EntityManager
     */
    protected $em;
    
    public function indexAction() {
        return $this->redirectToRoute('solmik-start');
    }

    /**
     * @Route("/solmik/string/create", name="solmik-string-create")
     * @Template()
     */
    public function createAction(Request $request) {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
//        print_r($this->getRequest()->request->all());
//        exit;
        $isAjax = $request->isXmlHttpRequest();
        
        $solmistring = new Entity\Solmistring();
        $form = $this->createForm(new Form\Type\SolmistringType(), $solmistring);

        $form->handleRequest($request);

//        if ($this->request->isPost()) {
//            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                $this->em = $this->getDoctrine()->getManager();
                $this->em->persist($solmistring);
                $this->em->flush();
                if($isAjax){
                    $encoder = new JsonEncoder();
                    $normalizer = new ObjectNormalizer();
                    $normalizer->setCircularReferenceHandler(function ($solmistring) {
                        return $solmistring->getId();
                    });
                    $serializer = new Serializer(array($normalizer), array($encoder));
                    $solmistringJson = $serializer->serialize($solmistring, 'json');
                    return new Response(json_encode(array('message' => 'Solmistring is created.', 'solmistring' => $solmistringJson, 'requestDataOriginal' => $this->getRequest()->request->all())));
                } else {
                    return $this->redirectToRoute('solmik-start');
                }
            }
//        }
        if($isAjax){
            return new Response(json_encode(array('message' => 'Solmistring form is NOT created.', 'requestDataOriginal' => $this->getRequest()->request->all(), 'errors' => (string) $form->getErrors(true, false))));
        } else {
            return array('form' => $form->createView());
        }
    }

    /**
     * @Route("/solmik/string/edit", name="solmik-string-edit")
     * @Template()
     */
    public function editAction(Request $request) {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        
        $isAjax = $request->isXmlHttpRequest();
        
        $id = $request->query->get('id');
        
        $solmistring = $this->getDoctrine()
            ->getRepository('MkoxSolmikBundle:Solmistring')
            ->find($id);
        $form = $this->createForm(new Form\Type\SolmistringType(), $solmistring);

        $form->handleRequest($request);

//        if ($this->request->isPost()) {
//            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                // Save the changes
                $this->em = $this->getDoctrine()->getManager();
                $this->em->flush();
                if($isAjax){
                    $encoder = new JsonEncoder();
                    $normalizer = new ObjectNormalizer();
                    $normalizer->setCircularReferenceHandler(function ($solmistring) {
                        return $solmistring->getId();
                    });
                    $serializer = new Serializer(array($normalizer), array($encoder));
                    $solmistringJson = $serializer->serialize($solmistring, 'json');
                    return new Response(json_encode(array('message' => 'Solmistring is created.', 'solmistring' => $solmistringJson, 'requestDataOriginal' => $this->getRequest()->request->all())));
                } else {
                    return $this->redirectToRoute('solmik-start');
                }
            }
//        }

        if($isAjax){
            return new Response(json_encode(array('message' => 'Solmistring form is NOT edited.', 'requestDataOriginal' => $this->getRequest()->request->all(), 'errors' => (string) $form->getErrors(true, false))));
        } else {
            return array('form' => $form->createView());
        }
    }

    /**
     * @Route("/solmik/string/delete", name="solmik-string-delete")
     * @Template()
     */
    public function deleteAction(Request $request) {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        
        $id = $request->query->get('id');
        if (!$id) {
            return $this->redirect()->toRoute('solmik');
        }

        if ($request->request->get('del')) {
            $del = $request->request->get('del');

            if ($del == 'Yes') {
                $this->em = $this->getDoctrine()->getManager();
                $this->em->remove($this->em->find('MkoxSolmikBundle:Solmistring', $id));
                $this->em->flush();
            }

            return $this->redirectToRoute('solmik-start');
        }
        
        return array(
            'id' => $id,
            'solmistring' => $this->getDoctrine()->getRepository('MkoxSolmikBundle:Solmistring')->find($id)
        );
    }

//    protected function attachDefaultListeners() {
//        parent::attachDefaultListeners();
//        $this->em = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
//    }

}
