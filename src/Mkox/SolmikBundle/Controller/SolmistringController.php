<?php

namespace Mkox\SolmikBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
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
        
        $solmistring = new Entity\Solmistring();
        $form = $this->createForm(new Form\Type\SolmistringType(), $solmistring);

        $form->handleRequest($request);

//        if ($this->request->isPost()) {
//            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                $this->em = $this->getDoctrine()->getManager();
                $this->em->persist($solmistring);
                $this->em->flush();
                return $this->redirectToRoute('solmik-start');
            }
//        }

        return array('form' => $form->createView());
    }

    /**
     * @Route("/solmik/string/edit", name="solmik-string-edit")
     * @Template()
     */
    public function editAction(Request $request) {
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
                return $this->redirectToRoute('solmik-start');
            }
//        }

        return array('form' => $form->createView());
    }

    /**
     * @Route("/solmik/string/delete", name="solmik-string-delete")
     * @Template()
     */
    public function deleteAction(Request $request) {
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
